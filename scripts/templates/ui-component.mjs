export const uiComponentAstro = (name, customElementName) => `---
import styles from './${name}.module.css';

interface Props {
    className?: string;
}

const { className } = Astro.props;
---

<${customElementName}>
    <div class:list={[styles.root, className]}>
    </div>
</${customElementName}>

<script>
    class ${name} extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
        }

        disconnectedCallback() {
        }
    }

    if (!customElements.get('${customElementName}')) {
        customElements.define('${customElementName}', ${name});
    }
</script>
`;

export const uiComponentCSS = () => `.root {
}

@media (width >= 768px) {
}

@media (width >= 1280px) {
}

@media (width >= 1920px) {
}
`;
