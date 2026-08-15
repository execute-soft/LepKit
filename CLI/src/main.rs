use clap::Parser;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use std::process::Command;

/// LepKit — scaffold a Leptos app from the leptos-setter template.
///
/// Creates a new project directory with the full leptos-setter codebase and
/// rewrites it for the given project name.
#[derive(Parser)]
#[command(
    name = "lepkit",
    version,
    about = "Scaffold a Leptos app from the leptos-setter template",
    after_help = "EXAMPLES:\n  lepkit my-app\n  lepkit my-app --path ~/code\n  lepkit my-app --no-git\n\nNEXT STEPS:\n  cd my-app\n  npm install\n  trunk serve"
)]
struct Args {
    /// Name of the new project
    project_name: String,

    /// Directory to create the project in (default: current directory)
    #[arg(long, default_value = ".")]
    path: String,

    /// Skip git initialization
    #[arg(long)]
    no_git: bool,

    /// Overwrite an existing non-empty directory
    #[arg(long)]
    force: bool,
}

const EXCLUDED_DIRS: &[&str] = &[
    ".git",
    "target",
    "dist",
    "node_modules",
    "CLI",
    ".opencode",
    "openspec",
];

const EXCLUDED_FILES: &[&str] = &["AGENTS.md"];

const NAME_TEMPLATE_FILES: &[&str] = &[
    "Cargo.toml",
    "Cargo.lock",
    "package.json",
    "package-lock.json",
];

fn source_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .expect("LepKit CLI has no parent directory")
        .to_path_buf()
}

fn valid_project_name(name: &str) -> Result<(), String> {
    if name.is_empty() {
        return Err("project name cannot be empty".into());
    }
    if name == "." || name == ".." {
        return Err(format!(
            "invalid project name `{name}`: cannot be '.' or '..'"
        ));
    }
    if name.starts_with('-') {
        return Err(format!(
            "invalid project name `{name}`: cannot start with '-'"
        ));
    }
    if !name
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
    {
        return Err(format!(
            "invalid project name `{name}`: only letters, digits, '-' and '_' are allowed"
        ));
    }
    Ok(())
}

fn dir_is_empty(dir: &Path) -> bool {
    match fs::read_dir(dir) {
        Ok(mut entries) => entries.next().is_none(),
        Err(_) => true,
    }
}

/// Copies `src` into `dst`, skipping tooling/build dirs and rewriting the
/// project name inside template files.
fn copy_tree(src: &Path, dst: &Path, name: &str) -> io::Result<()> {
    fs::create_dir_all(dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let file_name = entry.file_name();
        let name_str = file_name.to_string_lossy().into_owned();
        if entry.file_type()?.is_dir() {
            if EXCLUDED_DIRS.contains(&name_str.as_str()) {
                continue;
            }
            copy_tree(&entry.path(), &dst.join(file_name), name)?;
        } else {
            if EXCLUDED_FILES.contains(&name_str.as_str()) {
                continue;
            }
            let bytes = fs::read(entry.path())?;
            fs::write(dst.join(file_name), transform(&name_str, bytes, name))?;
        }
    }
    Ok(())
}

fn transform(file_name: &str, bytes: Vec<u8>, name: &str) -> Vec<u8> {
    if NAME_TEMPLATE_FILES.contains(&file_name) {
        String::from_utf8_lossy(&bytes)
            .replace("leptos-setter", name)
            .into_bytes()
    } else if file_name == "index.html" {
        let text = String::from_utf8_lossy(&bytes);
        if text.contains("<title>") {
            return bytes;
        }
        text.replace("</head>", &format!("<title>{name}</title></head>"))
            .into_bytes()
    } else {
        bytes
    }
}

fn run_git(project: &Path, args: &[&str]) -> std::io::Result<std::process::Output> {
    Command::new("git").args(args).current_dir(project).output()
}

fn init_git(project: &Path) {
    match run_git(project, &["init"]) {
        Ok(out) if out.status.success() => {
            let _ = run_git(project, &["add", "-A"]);
            match run_git(project, &["commit", "-m", "Initial commit from LepKit"]) {
                Ok(out) if !out.status.success() => {
                    eprintln!(
                        "warning: initial commit failed: {}",
                        String::from_utf8_lossy(&out.stderr).trim()
                    );
                }
                Err(e) => eprintln!("warning: could not run git commit: {e}"),
                _ => {}
            }
        }
        Ok(out) => eprintln!(
            "warning: git init failed: {}",
            String::from_utf8_lossy(&out.stderr).trim()
        ),
        Err(_) => eprintln!("warning: git not found; skipping git initialization"),
    }
}

fn main() {
    let args = Args::parse();

    if let Err(e) = valid_project_name(&args.project_name) {
        eprintln!("error: {e}");
        std::process::exit(1);
    }

    let source = source_root();
    if !source.join("Cargo.toml").exists() {
        eprintln!(
            "error: template source not found at {} (LepKit must live inside the leptos-setter repo)",
            source.display()
        );
        std::process::exit(1);
    }

    let project = Path::new(&args.path).join(&args.project_name);

    if project.exists() && !dir_is_empty(&project) && !args.force {
        eprintln!(
            "error: directory `{}` already exists and is not empty. Use --force to overwrite.",
            project.display()
        );
        std::process::exit(1);
    }

    if let Err(e) = copy_tree(&source, &project, &args.project_name) {
        eprintln!("error: failed to create project: {e}");
        std::process::exit(1);
    }

    if !args.no_git {
        init_git(&project);
    }

    println!(
        "\nCreated `{}` from the leptos-setter template",
        args.project_name
    );
    println!();
    println!("  cd {}", project.display());
    println!("  cargo install");
    println!("  trunk serve");
    println!();
}
