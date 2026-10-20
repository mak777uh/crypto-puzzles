var e=`use core::fmt;

/// Errors returned by LMS verification and signing.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LmsError {
    /// The signature does not have the exact length for the fixed parameter set.
    InvalidLength,
    /// The LM-OTS type code in the signature is not the expected one.
    WrongOtsType,
    /// The LMS type code in the signature is not the expected one.
    WrongLmsType,
    /// \`q\` is outside \`0..2^h\`.
    LeafOutOfRange,
    /// More than [\`crate::MAX_MSG_PARTS\`] message parts were passed.
    TooManyMessageParts,
    /// The signature is well formed but does not verify against the root.
    InvalidSignature,
}

impl fmt::Display for LmsError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            LmsError::InvalidLength => "LMS signature has the wrong length",
            LmsError::WrongOtsType => "LMS signature has an unsupported LM-OTS type code",
            LmsError::WrongLmsType => "LMS signature has an unsupported LMS type code",
            LmsError::LeafOutOfRange => "LMS leaf index out of range",
            LmsError::TooManyMessageParts => "too many message parts",
            LmsError::InvalidSignature => "LMS signature does not verify",
        };
        f.write_str(s)
    }
}
`;export{e as default};