import {
  PrepComponent,
  PrepStyledComponents,
  PrepCss,
  PrepStorybook,
  PrepDescription
} from '../../bin/app/contracts/PrepFile';

import {
  prepComponent,
  prepStyledComponents,
  prepCss,
  prepStorybook,
  prepDescription
} from '../../bin/frameworks/filesystem/prepFile';

// TODO: Test loc 63,104

describe('Failure cases', () => {
  describe('No input', () => {
    test('prepComponent should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepStyledComponents should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepCss should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepStorybook should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepDescription should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });
  });

  describe('Incorrect input', () => {
    test('prepComponent should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepStyledComponents should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepCss should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepStorybook should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepDescription should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });
  });
});

describe('Success cases', () => {
  test('It should prepare a Component file based on the React template', async () => {
    const data = {
      name: 'aaa',
      filePath: 'ComponentName',
      format: 'jsx',
      templates: {
        templatePathReact: 'templates/react.jsx'
      },
      text: 'fff',
      extraProps: 'qqq'
    };

    const fileContent = `import React from 'react';
import PropTypes from 'prop-types';

import {{NAME_STYLED}} from './{{NAME_STYLED}}';

const {{NAME}} = props => <{{NAME_STYLED}} {{EXTRA_PROPS}}>{{TEXT}}{props.children}</{{NAME_STYLED}}>;

{{NAME}}.propTypes = {};

export default {{NAME}};
`;

    const expectedData = { fileContent: fileContent, filePath: 'ComponentName.jsx' };

    await expect(prepComponent(data as PrepComponent)).resolves.toMatchObject(expectedData);
  });

  test('It should prepare a Styled Components file based on the Styled template', async () => {
    const data = {
      name: 'aaa',
      filePath: 'ComponentName',
      format: 'jsx',
      templates: {
        templatePathStyled: 'templates/styled.jsx'
      },
      element: 'div'
    };

    const fileContent = `import styled from 'styled-components';

import {{NAME_CSS}} from './{{NAME_CSS}}.ts'

// Do your regular imports like:
// import fontSizes from 'tokens/fontSizes';

// Extend the below as needed
const {{NAME_STYLED}} = styled.{{ELEMENT}}\`
  \${{{NAME_CSS}}};
\`;

export default {{NAME_STYLED}};
`;

    const expectedData = { fileContent: fileContent, filePath: 'ComponentNameStyled.jsx' };

    await expect(prepStyledComponents(data as PrepStyledComponents)).resolves.toMatchObject(
      expectedData
    );
  });

  test('It should prepare a CSS file based on the CSS template', () => {
    const css = `asdf`;

    const data = {
      name: 'ComponentName',
      filePath: 'ComponentName',
      format: 'mjs',
      imports: 'asdf', // TODO: FIX
      file: css
    };

    const fileContent = `// THIS FILE IS AUTO-GENERATED BY FIGMAGIC. DO NOT MAKE EDITS IN THIS FILE! CHANGES WILL GET OVER-WRITTEN BY ANY FURTHER PROCESSING.

asdf
const ComponentNameCss = \`asdf\`;

export default ComponentNameCss;`;

    const expectedData = { fileContent: fileContent, filePath: 'ComponentNameCss.mjs' };

    expect(prepCss(data as PrepCss)).toMatchObject(expectedData);
  });

  test('It should prepare a Storybook file based on the Storybook template', async () => {
    const data = {
      name: 'ComponentName',
      filePath: 'ComponentName',
      format: 'mjs',
      templates: {
        templatePathStorybook: 'templates/story.js'
      },
      text: 'Something here'
    };

    const fileContent = `import React from 'react';
import {{NAME}} from './{{NAME}}';

import notes from './{{NAME}}.description.md';

export default { title: '{{NAME}}', parameters: { notes } };

export const {{NAME}}Regular = () => <{{NAME}}>{{TEXT}}</{{NAME}}>
;`;

    const expectedData = { fileContent: fileContent, filePath: 'ComponentName.stories.mjs' };

    await expect(prepStorybook(data as PrepStorybook)).resolves.toMatchObject(expectedData);
  });

  test('It should prepare a Markdown description file based on the Markdown template', () => {
    const data = {
      filePath: 'ComponentName',
      file: 'Description here.',
      format: 'md'
    };

    const fileContent = `<!--THIS FILE IS AUTO-GENERATED BY FIGMAGIC. DO NOT MAKE EDITS IN THIS FILE! CHANGES WILL GET OVER-WRITTEN BY ANY FURTHER PROCESSING.-->
Description here.`;

    const expectedData = { fileContent: fileContent, filePath: 'ComponentName.description.md' };

    expect(prepDescription(data as PrepDescription)).toMatchObject(expectedData);
  });
});
