/**
 * WVWO Custom ESLint Rules
 * Enforce aesthetic compliance at build time
 *
 * Rules:
 * 1. wvwo-no-forbidden-rounded: Ban rounded-md/lg/xl
 * 2. wvwo-no-forbidden-fonts: Ban SaaS startup fonts
 * 3. wvwo-font-hand-context: font-hand ONLY for Kim notes
 * 4. wvwo-no-glassmorphism: Ban backdrop-blur
 */

module.exports = {
  'wvwo-no-forbidden-rounded': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforce rounded-sm only, ban rounded-md/lg/xl for hardware store aesthetic',
        category: 'WVWO Aesthetics',
        recommended: true,
      },
      fixable: 'code',
      schema: [],
      messages: {
        forbiddenRounded: 'WVWO VIOLATION: "{{className}}" is forbidden. Use "rounded-sm" (0.125rem) only for hardware store sharp corners.',
      },
    },
    create(context) {
      const FORBIDDEN = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];

      function checkClassValue(node, value) {
        if (!value) return;

        for (const forbidden of FORBIDDEN) {
          if (value.includes(forbidden)) {
            context.report({
              node,
              messageId: 'forbiddenRounded',
              data: { className: forbidden },
              fix(fixer) {
                const fixed = value.replace(new RegExp(forbidden, 'g'), 'rounded-sm');
                return fixer.replaceText(node, `"${fixed}"`);
              },
            });
          }
        }
      }

      return {
        // JSX: class="..." or className="..."
        JSXAttribute(node) {
          if (node.name.name !== 'class' && node.name.name !== 'className') return;

          const value = node.value?.value;
          if (value) {
            checkClassValue(node.value, value);
          }
        },

        // Astro: class:list={[...]}
        JSXExpressionContainer(node) {
          if (node.parent?.type !== 'JSXAttribute') return;
          if (node.parent.name?.name !== 'class') return;

          // Check array elements and object keys
          const expression = node.expression;

          if (expression.type === 'ArrayExpression') {
            expression.elements.forEach((element) => {
              if (element?.type === 'Literal') {
                checkClassValue(element, element.value);
              }
            });
          }
        },

        // Template literals: `rounded-md`
        TemplateLiteral(node) {
          node.quasis.forEach((quasi) => {
            const value = quasi.value.raw;

            for (const forbidden of FORBIDDEN) {
              if (value.includes(forbidden)) {
                context.report({
                  node: quasi,
                  messageId: 'forbiddenRounded',
                  data: { className: forbidden },
                });
              }
            }
          });
        },
      };
    },
  },

  'wvwo-no-forbidden-fonts': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Ban SaaS startup fonts (Inter, Poppins, etc.) - use Bitter/Permanent Marker/Noto Sans',
        category: 'WVWO Aesthetics',
        recommended: true,
      },
      schema: [],
      messages: {
        forbiddenFont: 'WVWO VIOLATION: "{{fontName}}" is a SaaS startup font. Use Bitter (display), Permanent Marker (hand), or Noto Sans (body).',
      },
    },
    create(context) {
      const FORBIDDEN_FONTS = [
        'Inter',
        'DM Sans',
        'Poppins',
        'Outfit',
        'system-ui',
        'Montserrat',
        'Raleway',
        'Open Sans',
      ];

      function checkFontValue(node, value) {
        if (!value) return;

        for (const forbidden of FORBIDDEN_FONTS) {
          if (value.includes(forbidden)) {
            context.report({
              node,
              messageId: 'forbiddenFont',
              data: { fontName: forbidden },
            });
          }
        }
      }

      return {
        // CSS-in-JS: fontFamily: 'Inter'
        Property(node) {
          if (node.key.name !== 'fontFamily' && node.key.name !== 'font-family') return;

          const value = node.value.value || '';
          checkFontValue(node, value);
        },

        // String literals containing font names
        Literal(node) {
          const value = node.value;
          if (typeof value !== 'string') return;

          // Check if in a font context (parent key contains 'font')
          const parent = context.getAncestors().find((ancestor) =>
            ancestor.type === 'Property' &&
            (ancestor.key.name?.includes('font') || ancestor.key.name?.includes('Font'))
          );

          if (parent) {
            checkFontValue(node, value);
          }
        },
      };
    },
  },

  'wvwo-font-hand-context': {
    meta: {
      type: 'problem',
      docs: {
        description: 'font-hand (Permanent Marker) ONLY for Kim notes with quotes',
        category: 'WVWO Aesthetics',
        recommended: true,
      },
      schema: [],
      messages: {
        fontHandMisuse: 'WVWO VIOLATION: font-hand (Permanent Marker) is ONLY for Kim\'s personal notes/tips with quotes. Use in feature.notes field only.',
      },
    },
    create(context) {
      return {
        JSXAttribute(node) {
          if (node.name.name !== 'class' && node.name.name !== 'className') return;

          const value = node.value?.value || '';
          if (!value.includes('font-hand')) return;

          // Check if in notes/tips context
          const hasNoteContext =
            value.includes('note') ||
            value.includes('tip') ||
            value.includes('kim');

          if (!hasNoteContext) {
            context.report({
              node,
              messageId: 'fontHandMisuse',
            });
          }
        },
      };
    },
  },

  'wvwo-no-glassmorphism': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Ban glassmorphism (backdrop-blur) - SaaS startup aesthetic',
        category: 'WVWO Aesthetics',
        recommended: true,
      },
      schema: [],
      messages: {
        glassmorphism: 'WVWO VIOLATION: backdrop-blur (glassmorphism) is forbidden. Use solid backgrounds for hardware store aesthetic.',
      },
    },
    create(context) {
      return {
        // Check class attributes for backdrop-blur
        JSXAttribute(node) {
          if (node.name.name !== 'class' && node.name.name !== 'className') return;

          const value = node.value?.value || '';
          if (value.includes('backdrop-blur')) {
            context.report({
              node,
              messageId: 'glassmorphism',
            });
          }
        },

        // Check CSS-in-JS
        Property(node) {
          if (node.key.name !== 'backdropFilter' && node.key.name !== 'backdrop-filter') return;

          context.report({
            node,
            messageId: 'glassmorphism',
          });
        },
      };
    },
  },
};
