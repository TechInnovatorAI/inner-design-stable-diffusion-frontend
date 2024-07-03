// Validate Japanese text
export const JapaneseValidate = (japaneseText: string) => {
  // Regular expression pattern to match Japanese characters
  const japaneseRegex = /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー・]+$/u
  if (japaneseRegex.test(japaneseText)) {
    return true
  } else {
    return false
  }
}

export const HiraganaValidate = (hiraganaText: string) => {
  // Regular expression pattern to match Hiragana characters
  const hiraganaRegex = /^[\p{Script=Hiragana}ー・]+$/u

  // Validate Hiragana text
  if (hiraganaRegex.test(hiraganaText)) {
    return true
  } else {
    return false
  }
}

export const KatakanaValidate = (katakanaText: string) => {
  // Regular expression pattern to match Katakana characters
  const katakanaRegex = /^[\p{Script=Katakana}ー・]+$/u

  // Validate Katakana text
  if (katakanaRegex.test(katakanaText)) {
    return true
  } else {
    return false
  }
}

export const KanjiValidate = (KanjiText: string) => {
  // Regular expression pattern to match Kanji characters
  const kanjiRegex = /^[\p{Script=Han}ー・]+$/u

  // Validate Kanji text
  if (kanjiRegex.test(KanjiText)) {
    return true
  } else {
    return false
  }
}

export const JapanAddressValidate = (japaneseAddress: string) => {
  // const japaneseAddress = "〒100-0000 東京都千代田区千代田1-1-1";
  // Regular expression pattern to match a common Japanese address format
  const addressRegex = /^〒\d{3}-\d{4}[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー・]+$/u

  // Validate Japanese address
  if (addressRegex.test(japaneseAddress)) {
    return true
  } else {
    return false
  }
}

export const JapanPhoneNumberValidate = (japanesePhoneNumber: string) => {
  const phoneNumberRegex = /^(?:\+81|0)(?:\d{1,4}-)?\d{1,4}-\d{4}$/

  // Validate Japanese phone number
  if (phoneNumberRegex.test(japanesePhoneNumber)) {
    return true
  } else {
    return false
  }
}
