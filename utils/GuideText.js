const guideText = `
# Quick Guide to Markdown

Wurdne uses Github Flavoured Markdown for its posts, which is markdown but with a few added features.

## Headings

# Heading 1 - \`# Heading 1\`  
## Heading 2 - \`## Heading 2\`  
### Heading 3 - \`### Heading 3\`  
#### Heading 4 - \`#### Heading 4\`  
##### Heading 5 - \`##### Heading 5\`  
###### Heading 6 - \`###### Heading 6\`  

## Text Effects

**bold text** - \`**bold text**\`  
*italic text* - \`*italic text*\`  
~~strike through~~ - \`~~strike through~~\`
> Blockquote - \`> Blockquote\`  

\`inline code\` - \\\`inline code\\\`  
\`\`\`js 
const codeBlock = new CodeBlock();
\`\`\` 
\\\`\\\`\\\`js
const codeBlock = new CodeBlock(): 
\\\`\\\`\\\`

## Lists
### Unordered List
- Item 1
- item 2  

\`- Item 1\`  
\`- Item 2\`

### Ordered List
1. Item 1
2. Item 2  

\`1. Item 1\`  
\`2. Item 2\`

### Checklist
- [ ] Item 1
- [x] Item 2  

\`- [ ] Item 1\`  
\`- [x] Item 2\`

## Tables

| Head 1| Head 2              |
| ---------: | :------------------- |
| Col 1               | Col 2              |
| Col 1 Again  | Row 2 Again|

\`| Head 1| Head 2              |\`  
\`| ---------: | :------------------- |\`  
\`| Col 1               | Col 2              |\`  
\`| Col 1 Again  | Row 2 Again|\`

## Links
This is a [link](https://youtu.be/dQw4w9WgXcQ)  
\`This is a [link](https://example.com)\`

## Images
![Alternate Text](https://youtu.be/dQw4w9WgXcQ)
\`![Alternate Text](https://youtu.be/dQw4w9WgXcQ)\`
`;

export default guideText;