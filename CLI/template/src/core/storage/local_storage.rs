#![allow(dead_code)]

use crate::core::storage::Storage;

pub fn get(key: &str) -> Option<String> {
    Storage::LOCAL.get(key)
}

pub fn get_or(key: &str, default: &str) -> String {
    Storage::LOCAL.get_or(key, default)
}

pub fn set(key: &str, value: &str) {
    Storage::LOCAL.set(key, value);
}

pub fn remove(key: &str) {
    Storage::LOCAL.remove(key);
}