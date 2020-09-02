import dotenv from 'dotenv';

import { Config } from '../../bin/entities/Config/Config';

import { processGraphics } from '../../bin/app/process/processGraphics';
import { getIds } from '../../bin/app/process/graphics/getIds';
import { getIdString } from '../../bin/app/process/graphics/getIdString';
import { getFileList } from '../../bin/app/process/graphics/getFileList';

import { getFromApi } from '../../bin/frameworks/network/getFromApi';

//import { graphicsFrame } from '../../testdata/frames/graphicsFrame';
import { graphicsPage } from '../../testdata/graphicsPage';

dotenv.config();

// TODO: Test loc 27-37

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(processGraphics()).rejects.toThrow();
  });

  test('It should throw when missing arguments', () => {
    // @ts-ignore
    expect(() => getFileList()).toThrow();
  });

  test('It should throw when missing argument', () => {
    // @ts-ignore
    expect(() => getIds()).toThrow();
  });

  test('It should throw when missing items in argument', () => {
    // @ts-ignore
    expect(() => getIds({})).toThrow();
  });

  test('It should throw when missing ids', () => {
    // @ts-ignore
    expect(() => getIdString()).toThrow();
  });

  test('It should throw an error when receiving invalid token and/or URL', async () => {
    expect(await getFromApi('asdf', 'asdf')).toEqual(
      expect.objectContaining({ err: 'Invalid token', status: 403 })
    );
  });
});

describe('Success cases', () => {
  test('It should exit correctly after having processed valid input', async () => {
    await expect(
      // @ts-ignore
      processGraphics(graphicsPage, {
        outputFileName: 'figma.json',
        outputFolderBaseFile: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: process.env.FIGMA_TOKEN,
        url: process.env.FIGMA_URL
      } as Config)
    ).resolves.toEqual(expect.objectContaining({}));
  });

  test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
    const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
    expect(DATA.document.id).toEqual('0:0');
  });
});
