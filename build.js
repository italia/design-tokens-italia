// build.js
import StyleDictionary from 'style-dictionary';

console.log('📦 Building SCSS and CSS...');

// Create StyleDictionary instance and wait for initialization
const sd = new StyleDictionary('config.json');
await sd.hasInitialized;

// Apply '' to composed font family names
sd.registerTransform({
  name: 'font/family',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'fontFamilies',  // matcher → filter
  transform: (token) => {  // transformer → transform
    if (token.original.value.startsWith('{'))
      return token.value;
    else
      return `'${token.value}'`;
  },
});

// sd.registerTransform({
//   name: 'font/weight',
//   type: 'value',
//   filter: (token) => token.original.type === 'fontWeights',  // matcher → filter
//   transform: (token) => {  // transformer → transform
//     const fontWeight = token.original.value;
//     switch (fontWeight) {
//       case 'ExtraLight':
//         return '200';
//       case 'Light':
//         return '300';
//       case 'Regular':
//         return '400';
//       case 'SemiBold':
//         return 600;
//       case 'Bold':
//         return 700;
//       default:
//         return '400';
//     }
//   }
// });

sd.registerTransform({
  name: 'spacing/px',
  type: 'value',
  filter: (token) => token.attributes?.category === 'spacer',  // matcher → filter
  transform: (token) => {  // transformer → transform
    return parseFloat(token.original.value) + 'px';
  }
});

sd.registerTransform({
  name: 'shadow/type',
  type: 'value',
  filter: (token) => token.original.type === 'type',  // matcher → filter
  transform: (token) => {  // transformer → transform
    const dropShadow = token.original.value;
    switch (dropShadow) {
      case 'dropShadow':
        return "''";
      case 'innerShadow':
        return 'inset';
      default:
        return "''";
    }
  }
});

// Register custom format with updated API
sd.registerFormat({
  name: 'custom/scss/variables',
  format: ({ dictionary }) => {  // formatter → format, destructured params
    return dictionary.allTokens.map((token) => {
      return `$${token.name}: ${token.value};`;
    }).join('\\n');
  }
});

// Build all platforms (now async)
await sd.buildAllPlatforms();

console.log('\\n✅ CSS + SCSS variables files created \\n');