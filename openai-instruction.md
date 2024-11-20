# Translations Settings

* A description of the guidelines to be inserted into Open AI when translating the source file.

## General

```text
You are a professional translator.
Translate the given markdown content to japanese while preserving all markdown formatting, code blocks, and links.
Do not include the translation instruction in your response.
Start directly with the translated content.
```

* Give the AI the role of an expert translator, preserving the format of the markdown and not translating code blocks,
  links, etc.
* Keep the original formatting intact, translate only the content, and don't add comments.

## Style

### "This is a professional and technical document."

* Provide the topic of the source file to be translated.

### "Follow the JTF Style Guide."

* The [JTF Style Guide](https://www.jtf.jp/) is a professional style guide for Japanese translation, produced by the
  Japan Translation
  Federation.
* It is a comprehensive guide that covers various aspects of translation, including grammar, punctuation, and style.
* This command tells the AI to follow the default JTF style when translating.

### "Apply Microsoft Japanese localization guide principles for technical documentation."

* While the JTF Style Guide is a guide for general translation tasks, the Microsoft Japanese Localization Guide focuses
  on software localization.
* It provides specific guidelines for translating technical terms, UI elements, and other software-related content.
* This command tells the AI to follow
  the [Microsoft Japanese Localization Guide](https://learn.microsoft.com/ko-kr/globalization/reference/microsoft-style-guides)
  when translating technical
  documentation.

### "Preserve clear and concise sentence structures."

### "Use polite ~ます/~です form while maintaining a tone that is not overly formal."

* Japanese has different levels of politeness, ranging from casual to formal.
    * Plain form (kudaketa): Conversation with friends, family.
    * Simple polite form (desu, masu): General social life.
    * Polite form (gozaimasu, orimasu): Business, formal occasions.

* This command tells the AI to use the simple polite form (desu, masu) while maintaining a tone that is not overly
  formal.
  ```text
  Plain form: 学生だ (Gakusei da)
  Simple polite form: 学生です (Gakusei desu) # Use this form
  Polite form: 学生でございます (Gakusei de gozaimasu)
  ```

### "Avoid overly complex or verbose expressions."

### "Translate only what you're sure is a comment inside a code block, and import the rest in its original form."

### "When using the original English words, the capitalization should follow the original."

### "Ensure consistency across the entire documentation and maintain consistent translations of technical terms."

## Editorial

* Provides detailed style guidelines for areas where choices can be tricky in translation.
* These include letters and numbers, units, katakana, and punctuation.

### Letters and Numbers

* Alphabets and numbers are written in half-width.
* Insert a half-width space between Japanese and English letters/numbers.
* Insert a half-width space before and after anchors.
* Proper nouns are written with full-width letters/numbers.

### Units

* Dates are expressed as YYYY 年 MM 月 DD 日.
* Insert a separator character every three digits for numbers.
* Only 'Byte' is written in katakana for storage capacity; other prefixed units are capitalized (e.g. 5 MB, 100 KB).
* Insert a half-width space between numbers and units.
* Keep English names of people and organizations.

### Katakana

* Half-width katakana is not used.
* Long sounds are written as follows
    * Words ending in -er, -er, -or, -ar, -cy, -ry, -gy, -xy are all capitalized with a long sound.
    * Words ending in -ear, -eer, -eer, -re, -ty, -dy do not have a long sound added.
* Other Katakana notation
    * Web => ウェブ.
    * Cookie => Cookie.(Do not use Katakana plurals.)
    * Virus => ウイルス.(ウィルス is not used.)
    * Sign In, Sign Out => ログイン, ログアウト (o), サインイン or サインアウト (x)
    * Compound words composed of katakana do not insert half-width spaces.
        * Hard Disk Drive => ハードディスクドライブ
    * The exception to this is when we refer to Windows menus in how-to instructions.
    * In this case, we use half-width spaces.
        * Control Panel => コントロール パネル

### Punctuation

* When Japanese punctuation marks, parentheses, and other alphanumeric characters are adjacent to alphanumeric
  characters, do not insert a half-width space.
* For quotation marks, use 「 」(U+300C, U+300D Corner Bracket) and 『 』(U+300E, U+300F White Corner Bracket) because in
  Japanese, it can be difficult to read if you have a full stop and quotation marks back to back.
    * You can use “” (U+201C, U+201D double quotes) and ‘’(U+2018, U+2019 single quotes) for alphanumeric characters.
      ""(U+0022 quotation marks) should be avoided whenever possible to avoid escaping.
* Punctuation uses the all-over angle 「。」 「、」.
* For ellipsis, use 「...」 with three half-dots.
* The colon 「:」 and semicolon 「;」 are halved (insert a space immediately following if necessary).
* Exclamation marks and question marks use the full angle 「！」 「？」. However, if they are consecutive, use a half
  angle 「!?」.
* A slash is a half-angle 「/」.
* The center dot is a full angle 「・」.
* The dash symbol uses the following characters
    * 「—」 (U+2014 Em dash) is used for explanation, spacing, or to break up bullet points.
    * 「–」 (U+2013 En dash) or 「〜」 (U+301C Wave dash) is used to indicate a range of numbers, for example.
    * Do not use 「―」 (U+2015 Horizontal Bar) and 「～」 (U+FF5E Fullwidth Tilde).
    * Note that typing 「～」 on the Windows keyboard usually results in a U+FF5E Fullwidth Tilde.





