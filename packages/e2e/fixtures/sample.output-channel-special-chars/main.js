export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'special-chars',
    label: 'Special Chars & Unicode 🌟'
  })
  
  // Test various special characters and unicode
  channel.append('=== SPECIAL CHARACTERS TEST ===\n')
  
  // HTML special characters
  channel.append('HTML: <script>alert("test")</script> &amp; &lt; &gt; &quot; &#39;\n')
  
  // Unicode characters
  channel.append('Unicode: 🚀 🌟 💻 🎉 中文 العربية русский 日本語 한국어\n')
  
  // Emojis
  channel.append('Emojis: 😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 🤯 🤠 🥳 😎 🤓 🧐\n')
  
  // Mathematical symbols
  channel.append('Math: ∑ ∏ ∫ ∂ ∇ ∆ ∂ ∞ ± × ÷ ≈ ≠ ≤ ≥ ∈ ∉ ∪ ∩ ⊂ ⊃ ∧ ∨ ¬ ∀ ∃ ∅\n')
  
  // Currency symbols
  channel.append('Currency: $ € £ ¥ ₽ ₹ ₩ ₪ ₫ ₡ ₦ ₨ ₱ ₲ ₴ ₸ ₼ ₽\n')
  
  // Special whitespace and control characters
  channel.append('Whitespace:\ttab\nspace  multiple\n')
  channel.append('Newlines:\n\n\nTriple newline\n')
  
  // Quotes and apostrophes
  channel.append('Quotes: "double" \'single\' "smart double" \'smart single\' «guillemets» ‹single›\n')
  
  // Diacritics and accented characters
  channel.append('Accents: café résumé naïve façade señor niño über muñoz\n')
  
  // Arrows and symbols
  channel.append('Arrows: ← → ↑ ↓ ↔ ↕ ↖ ↗ ↘ ↙ ⇒ ⇐ ⇑ ⇓ ⇔ ⇕ ⇖ ⇗ ⇘ ⇙\n')
  
  // Box drawing characters
  channel.append('Box: ┌─┬─┐\n│ │ │ │\n├─┼─┤\n│ │ │ │\n└─┴─┘\n')
  
  // Brackets and parentheses
  channel.append('Brackets: () [] {} <> ⟨⟩ ⟦⟧ ⟨⟩ ⟪⟫\n')
  
  // Line terminators and special characters
  channel.append('Special: \u0000 (null) \b (backspace) \f (form feed) \r (carriage return)\n')
  
  // RTL text
  channel.append('RTL: שלום עולם العربية مرحبا\n')
  
  channel.append('=== END SPECIAL CHARACTERS ===\n')
}
