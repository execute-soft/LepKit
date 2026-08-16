#![allow(dead_code)]

use crate::core::storage::Storage;

pub fn get(key: &str) -> Option<String> {
    Storage::SESSION.get(key)
}

pub fn get_or(key: &str, default: &str) -> String {
    Storage::SESSION.get_or(key, default)
}

pub fn set(key: &str, value: &str) {
    Storage::SESSION.set(key, value);
}

pub fn remove(key: &str) {
    Storage::SESSION.remove(key);
}