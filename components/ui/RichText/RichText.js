import PropTypes from 'prop-types';
import cx from 'classnames';

import { fixUrl } from 'utils';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Link from 'next/link';

import styles from './RichText.module.scss';

const defaultRichTextOptions = removeLineBreaks => {
    return {
        renderNode: {
            [INLINES.HYPERLINK]: (node, children) => {
                const { url, type } = fixUrl(node.data.uri);
                switch (type) {
                    case 'external': {
                        return (
                            <a
                                className={styles.inlineHyperlink}
                                href={url}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {children}
                            </a>
                        );
                    }
                    case 'internal': {
                        return (
                            <Link href={url}>
                                <a className={styles.inlineHyperlink}>
                                    {children}
                                </a>
                            </Link>
                        );
                    }
                    default: {
                        return (
                            <span
                                className={styles.inlineHyperlink}
                                style={{ color: 'var(--coral)' }}
                            >
                                {children}
                            </span>
                        );
                    }
                }
            },
        },
        renderText: text => {
            return text
                .split('\n')
                .reduce(
                    (children, textSegment, i) =>
                        i === 0
                            ? [textSegment]
                            : [
                                  ...children,
                                  removeLineBreaks ? ' ' : <br key={i} />,
                                  textSegment,
                              ],
                    []
                );
        },
    };
};

const RichText = ({
    as: Component,
    document,
    removeLineBreaks,
    richTextOptions,
    className,
}) => {
    const content = documentToReactComponents(document.json, {
        ...defaultRichTextOptions(removeLineBreaks),
        ...richTextOptions,
    });
    if (Component) {
        return (
            <Component className={cx(styles.root, className)}>
                {content}
            </Component>
        );
    }
    return content;
};

RichText.propTypes = {
    as: PropTypes.string,
    document: PropTypes.object.isRequired,
    removeLineBreaks: PropTypes.bool,
    richTextOptions: PropTypes.object,
    className: PropTypes.string,
};

RichText.defaultProps = {
    removeLineBreaks: false,
    richTextOptions: {},
};

export default RichText;
