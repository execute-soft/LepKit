#![allow(unused_imports)]

#![allow(dead_code)]

pub mod local_storage;
pub mod session_storage;
mod signal;
mod storage;

pub use signal::{
    storage_rw_signal, storage_rw_signal_str, storage_signal, storage_signal_str,
};
pub use storage::{Storage, StorageKind};