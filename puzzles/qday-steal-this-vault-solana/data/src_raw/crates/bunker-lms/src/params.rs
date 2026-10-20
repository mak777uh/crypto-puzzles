//! RFC 8554 parameter sets (§4.1 Table 1 and §5.1 Table 2).
//!
//! The core algorithms are written against these runtime parameter structs so the test-suite can
//! check every RFC 8554 Appendix F vector. The public API only ever uses
//! [`LMS_SHA256_M32_H10`] + [`LMOTS_SHA256_N32_W4`].
#![allow(dead_code)]

/// LM-OTS parameters (n is always 32 here: SHA-256 only).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct OtsParams {
    pub typecode: u32,
    /// Winternitz parameter (1, 2, 4 or 8).
    pub w: u8,
    /// Number of n-byte chains.
    pub p: usize,
    /// Left shift applied to the checksum.
    pub ls: u8,
}

impl OtsParams {
    /// Encoded LM-OTS signature length: u32 type ‖ C ‖ y[0..p].
    pub const fn sig_len(&self) -> usize {
        4 + crate::N + self.p * crate::N
    }
    /// 2^w - 1: the last chain index.
    pub const fn max_digit(&self) -> u16 {
        (1u16 << self.w) - 1
    }
}

/// LMS parameters (m is always 32 here: SHA-256 only).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct LmsParams {
    pub typecode: u32,
    /// Tree height.
    pub h: usize,
}

impl LmsParams {
    /// Encoded LMS signature length for a given LM-OTS parameter set.
    pub const fn sig_len(&self, ots: &OtsParams) -> usize {
        4 + ots.sig_len() + 4 + self.h * crate::N
    }
}

pub(crate) const LMOTS_SHA256_N32_W1: OtsParams = OtsParams {
    typecode: 1,
    w: 1,
    p: 265,
    ls: 7,
};
pub(crate) const LMOTS_SHA256_N32_W2: OtsParams = OtsParams {
    typecode: 2,
    w: 2,
    p: 133,
    ls: 6,
};
pub(crate) const LMOTS_SHA256_N32_W4: OtsParams = OtsParams {
    typecode: 3,
    w: 4,
    p: 67,
    ls: 4,
};
pub(crate) const LMOTS_SHA256_N32_W8: OtsParams = OtsParams {
    typecode: 4,
    w: 8,
    p: 34,
    ls: 0,
};

pub(crate) const LMS_SHA256_M32_H5: LmsParams = LmsParams { typecode: 5, h: 5 };
pub(crate) const LMS_SHA256_M32_H10: LmsParams = LmsParams { typecode: 6, h: 10 };
pub(crate) const LMS_SHA256_M32_H15: LmsParams = LmsParams { typecode: 7, h: 15 };
pub(crate) const LMS_SHA256_M32_H20: LmsParams = LmsParams { typecode: 8, h: 20 };
pub(crate) const LMS_SHA256_M32_H25: LmsParams = LmsParams { typecode: 9, h: 25 };

pub(crate) fn ots_by_type(t: u32) -> Option<&'static OtsParams> {
    match t {
        1 => Some(&LMOTS_SHA256_N32_W1),
        2 => Some(&LMOTS_SHA256_N32_W2),
        3 => Some(&LMOTS_SHA256_N32_W4),
        4 => Some(&LMOTS_SHA256_N32_W8),
        _ => None,
    }
}

pub(crate) fn lms_by_type(t: u32) -> Option<&'static LmsParams> {
    match t {
        5 => Some(&LMS_SHA256_M32_H5),
        6 => Some(&LMS_SHA256_M32_H10),
        7 => Some(&LMS_SHA256_M32_H15),
        8 => Some(&LMS_SHA256_M32_H20),
        9 => Some(&LMS_SHA256_M32_H25),
        _ => None,
    }
}

// Compile-time checks that the fixed public constants agree with the parameter tables.
const _: () = {
    assert!(LMOTS_SHA256_N32_W4.p == crate::P);
    assert!(LMOTS_SHA256_N32_W4.typecode == crate::LMOTS_TYPE);
    assert!(LMS_SHA256_M32_H10.typecode == crate::LMS_TYPE);
    assert!(LMS_SHA256_M32_H10.h == crate::H);
    assert!(LMS_SHA256_M32_H10.sig_len(&LMOTS_SHA256_N32_W4) == crate::SIG_LEN);
};
