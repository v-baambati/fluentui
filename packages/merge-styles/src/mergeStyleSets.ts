import { concatStyleSets } from './concatStyleSets';
import { extractStyleParts } from './extractStyleParts';
import { IStyle } from './IStyle';
import { IStyleOptions } from './IStyleOptions';
import { IConcatenatedStyleSet, IProcessedStyleSet, IStyleSet } from './IStyleSet';
import { getStyleOptions } from './StyleOptionsState';
import { applyRegistration, styleToRegistration } from './styleToClassName';
import { ObjectOnly } from './ObjectOnly';
import { isShadowConfig, ShadowConfig } from './shadowConfig';
import { Stylesheet } from './Stylesheet';

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet - The first style set to be merged and reigstered.
 */
export function mergeStyleSets<TStyleSet>(
  styleSet: TStyleSet | false | null | undefined,
): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 */
export function mergeStyleSets<TStyleSet1, TStyleSet2>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2>>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 */
export function mergeStyleSets<TStyleSet1, TStyleSet2, TStyleSet3>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined,
  styleSet3: TStyleSet3 | false | null | undefined,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3>>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 * @param styleSet4 - The fourth style set to be merged.
 */
export function mergeStyleSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined,
  styleSet3: TStyleSet3 | false | null | undefined,
  styleSet4: TStyleSet4 | false | null | undefined,
): IProcessedStyleSet<
  ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3> & ObjectOnly<TStyleSet4>
>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(
  ...styleSets: Array<IStyleSet | undefined | false | null | ShadowConfig>
): IProcessedStyleSet<any>;

export function mergeStyleSets(
  shadowConfig: ShadowConfig,
  ...styleSets: Array<IStyleSet | undefined | false | null>
): IProcessedStyleSet<any>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(
  ...styleSets: Array<IStyleSet | undefined | false | null | ShadowConfig>
): IProcessedStyleSet<any> {
  return mergeCssSets(styleSets as any, getStyleOptions());
}

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet>(
  styleSets: [TStyleSet | false | null | undefined],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2>(
  styleSets: [TStyleSet1 | false | null | undefined | ShadowConfig, TStyleSet2 | false | null | undefined],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2, TStyleSet3>(
  styleSets: [
    TStyleSet1 | false | null | undefined | ShadowConfig,
    TStyleSet2 | false | null | undefined,
    TStyleSet3 | false | null | undefined,
  ],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4>(
  styleSets: [
    TStyleSet1 | false | null | undefined | ShadowConfig,
    TStyleSet2 | false | null | undefined,
    TStyleSet3 | false | null | undefined,
    TStyleSet4 | false | null | undefined,
  ],
  options?: IStyleOptions,
): IProcessedStyleSet<
  ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3> & ObjectOnly<TStyleSet4>
>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet>(
  styleSet: [TStyleSet | false | null | undefined],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets(
  styleSets: Array<IStyleSet | undefined | false | null | ShadowConfig>,
  options?: IStyleOptions,
): IProcessedStyleSet<any> {
  const classNameSet: IProcessedStyleSet<any> = { subComponentStyles: {} };

  let shadowConfig: ShadowConfig | undefined = undefined;
  let styleSet;
  if (isShadowConfig(styleSets[0])) {
    shadowConfig = styleSets[0] as ShadowConfig;
    styleSet = styleSets[1];
  } else {
    styleSet = styleSets[0];
  }

  shadowConfig ??= options?.shadowConfig;

  const opts = { ...options, shadowConfig };

  if (!styleSet && styleSets.length <= 1) {
    return { subComponentStyles: {} } as any;
  }

  const sheet = Stylesheet.getInstance(shadowConfig);
  opts.stylesheet = sheet;
  const concatenatedStyleSet = concatStyleSets(...styleSets);

  const registrations = [];

  for (const styleSetArea in concatenatedStyleSet) {
    if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
      if (styleSetArea === 'subComponentStyles') {
        classNameSet.subComponentStyles = (concatenatedStyleSet as IConcatenatedStyleSet<any>).subComponentStyles || {};
        continue;
      } else if (styleSetArea === '__shadowConfig__') {
        continue;
      }

      const styles: IStyle = (concatenatedStyleSet as any)[styleSetArea];

      const { classes, objects } = extractStyleParts(sheet, styles);

      if (objects?.length) {
        const registration = styleToRegistration(opts || {}, { displayName: styleSetArea }, objects);

        if (registration) {
          registrations.push(registration);
          // FIXME: classNameSet invalid types - exposed in TS 4.5 - cast needed
          (classNameSet as Record<string, any>)[styleSetArea] = classes.concat([registration.className]).join(' ');
        }
      } else {
        // FIXME: classNameSet invalid types - exposed in TS 4.5 - cast needed
        (classNameSet as Record<string, any>)[styleSetArea] = classes.join(' ');
      }
    }
  }

  for (const registration of registrations) {
    if (registration) {
      applyRegistration(registration, options?.specificityMultiplier, shadowConfig);
    }
  }

  return classNameSet as any;
}
