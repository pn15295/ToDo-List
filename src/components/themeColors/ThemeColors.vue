<template>
  <style>
    :root {
      --color-cta: {{ darkMode ? dark.cta : light.cta }};
      --color-cta-active: {{ darkMode ? dark.ctaActive : light.ctaActive }};
      --color-cta-contrast: {{ darkMode ? dark.ctaContrast : light.ctaContrast }};
      --color-cta-hover: {{ darkMode ? dark.ctaHover : light.ctaHover }};
      --color-cta-light: {{ darkMode ? dark.ctaLight : light.ctaLight }};
      --color-cta-light-active: {{ darkMode ? dark.ctaLightActive : light.ctaLightActive }};
      --color-cta-light-contrast: {{ darkMode ? dark.ctaLightContrast : light.ctaLightContrast }};
      --color-cta-light-hover: {{ darkMode ? dark.ctaLightHover : light.ctaLightHover }};

      --color-hlt: {{ darkMode ? dark.highlight : light.highlight }};
      --color-hlt-active: {{ darkMode ? dark.highlightActive : light.highlightActive }};
      --color-hlt-contrast: {{ darkMode ? dark.highlightContrast : light.highlightContrast }};
      --color-hlt-hover: {{ darkMode ? dark.highlightHover : light.highlightHover }};
      --color-hlt-light: {{ darkMode ? dark.highlightLight : light.highlightLight }};
      --color-hlt-light-active: {{ darkMode ? dark.highlightLightActive : light.highlightLightActive }};
      --color-hlt-light-contrast: {{ darkMode ? dark.highlightLightContrast : light.highlightLightContrast }};
      --color-hlt-light-hover: {{ darkMode ? dark.highlightLightHover : light.highlightLightHover }};

      --color-thm: {{ darkMode ? dark.theme : light.theme }};
      --color-thm-active: {{ darkMode ? dark.themeActive : light.themeActive }};
      --color-thm-contrast: {{ darkMode ? dark.themeContrast : light.themeContrast }};
      --color-thm-hover: {{ darkMode ? dark.themeHover : light.themeHover }};
      --color-thm-light: {{ darkMode ? dark.themeLight : light.themeLight }};
      --color-thm-light-active: {{ darkMode ? dark.themeLightActive : light.themeLightActive }};
      --color-thm-light-contrast: {{ darkMode ? dark.themeLightContrast : light.themeLightContrast }};
      --color-thm-light-hover: {{ darkMode ? dark.themeLightHover : light.themeLightHover }};

      --color-bgr: {{ darkMode ? dark.background : light.background }};
      --color-bgr100: {{ darkMode ? dark.background100 : light.background100 }};
      --color-bgr200: {{ darkMode ? dark.background200 : light.background200 }};
      --color-bgr300: {{ darkMode ? dark.background300 : light.background300 }};
      --color-bgr400: {{ darkMode ? dark.background400 : light.background400 }};
      --color-bgr500: {{ darkMode ? dark.background500 : light.background500 }};
      --color-bgr600: {{ darkMode ? dark.background600 : light.background600 }};
      --color-bgr700: {{ darkMode ? dark.background700 : light.background700 }};
      --color-bgr800: {{ darkMode ? dark.background800 : light.background800 }};
      --color-bgr900: {{ darkMode ? dark.background900 : light.background900 }};

      --color-txt: {{ darkMode ? dark.text : light.text }};
      --color-txt-dim: {{ darkMode ? dark.textDim : light.textDim }};
      --color-txt-stress: {{ darkMode ? dark.textStress : light.textStress }};
      --color-txt100: {{ darkMode ? dark.text100 : light.text100 }};
      --color-txt200: {{ darkMode ? dark.text200 : light.text200 }};
      --color-txt300: {{ darkMode ? dark.text300 : light.text300 }};
      --color-txt400: {{ darkMode ? dark.text400 : light.text400 }};
      --color-txt500: {{ darkMode ? dark.text500 : light.text500 }};
      --color-txt600: {{ darkMode ? dark.text600 : light.text600 }};
      --color-txt700: {{ darkMode ? dark.text700 : light.text700 }};
      --color-txt800: {{ darkMode ? dark.text800 : light.text800 }};
      --color-txt900: {{ darkMode ? dark.text900 : light.text900 }};
      --color-txt-link: {{ darkMode ? dark.textLink : light.textLink }};
      --color-txt-link-active: {{ darkMode ? dark.textLinkActive : light.textLinkActive }};
      --color-txt-link-contrast: {{ darkMode ? dark.textLinkContrast : light.textLinkContrast }};
      --color-txt-link-hover: {{ darkMode ? dark.textLinkHover : light.textLinkHover }};

      --color-inf: {{ darkMode ? dark.info : light.info }};
      --color-inf-active: {{ darkMode ? dark.infoActive : light.infoActive }};
      --color-inf-contrast: {{ darkMode ? dark.infoContrast : light.infoContrast }};
      --color-inf-hover: {{ darkMode ? dark.infoHover : light.infoHover }};
      --color-inf-light: {{ darkMode ? dark.infoLight : light.infoLight }};
      --color-inf-text: {{ darkMode ? dark.infoText : light.infoText }};

      --color-suc: {{ darkMode ? dark.success : light.success }};
      --color-suc-active: {{ darkMode ? dark.successActive : light.successActive }};
      --color-suc-contrast: {{ darkMode ? dark.successContrast : light.successContrast }};
      --color-suc-hover: {{ darkMode ? dark.successHover : light.successHover }};
      --color-suc-light: {{ darkMode ? dark.successLight : light.successLight }};
      --color-suc-text: {{ darkMode ? dark.successText : light.successText }};

      --color-wrn: {{ darkMode ? dark.warning : light.warning }};
      --color-wrn-active: {{ darkMode ? dark.warningActive : light.warningActive }};
      --color-wrn-contrast: {{ darkMode ? dark.warningContrast : light.warningContrast }};
      --color-wrn-hover: {{ darkMode ? dark.warningHover : light.warningHover }};
      --color-wrn-light: {{ darkMode ? dark.warningLight : light.warningLight }};
      --color-wrn-text: {{ darkMode ? dark.warningText : light.warningText }};

      --color-err: {{ darkMode ? dark.error : light.error }};
      --color-err-active: {{ darkMode ? dark.errorActive : light.errorActive }};
      --color-err-contrast: {{ darkMode ? dark.errorContrast : light.errorContrast }};
      --color-err-hover: {{ darkMode ? dark.errorHover : light.errorHover }};
      --color-err-light: {{ darkMode ? dark.errorLight : light.errorLight }};
      --color-err-text: {{ darkMode ? dark.errorText : light.errorText }};

      --color-offer: {{ darkMode ? dark.offer : light.offer }};
      --color-supplier: {{ darkMode ? dark.supplier : light.supplier }};
      --color-accommodation: {{ darkMode ? dark.accommodation : light.accommodation }};
    }
  </style>
</template>

<script>
export default {
  name: "ThemeColors",
  data() {
    return {
      light: {
        cta: "#0096db",
        ctaActive: "#006594",
        ctaContrast: "#ffffff",
        ctaHover: "#007db7",
        ctaLight: "#ebf9ff",
        ctaLightActive: "#b8e8ff",
        ctaLightContrast: "#0096db",
        ctaLightHover: "#d7f2ff",

        highlight: "#f1083b",
        highlightActive: "#a30528",
        highlightContrast: "#ffffff",
        highlightHover: "#c50730",
        highlightLight: "#fff0f3",
        highlightLightActive: "#fdc9d4",
        highlightLightContrast: "#f1083b",
        highlightLightHover: "#fedce4",

        theme: "#0096db",
        themeActive: "#006594",
        themeContrast: "#ffffff",
        themeHover: "#007db7",
        themeLight: "#ebf9ff",
        themeLightActive: "#b8e8ff",
        themeLightContrast: "#0096db",
        themeLightHover: "#d7f2ff",

        background: "#ffffff",
        background100: "#f5f5f5",
        background200: "#eaebec",
        background300: "#c9cccf",
        background400: "#b7bbbe",
        background500: "#999fa3",
        background600: "#757c81",
        background700: "#575c60",
        background800: "#383b3e",
        background900: "#131516",

        text: "#000000",
        textDim: "#575c60",
        textStress: "#c9cccf",
        text100: "#131516",
        text200: "#383b3e",
        text300: "#575c60",
        text400: "#757c81",
        text500: "#999fa3",
        text600: "#b7bbbe",
        text700: "#c9cccf",
        text800: "#eaebec",
        text900: "#f5f5f5",
        textLink: "#0096db",
        textLinkActive: "#006594",
        textLinkContrast: "#ffffff",
        textLinkHover: "#007db7",

        info: "#306ec5",
        infoActive: "#204983",
        infoContrast: "#ffffff",
        infoHover: "#285ca4",
        infoLight: "#ebf9ff",
        infoText: "#306ec5",

        success: "#36bf78",
        successActive: "#247f50",
        successContrast: "#ffffff",
        successHover: "#2d9f64",
        successLight: "#effbf5",
        successText: "#36bf78",

        warning: "#ffa600",
        warningActive: "#a36a00",
        warningContrast: "#131516",
        warningHover: "#d18800",
        warningLight: "#fff8eb",
        warningText: "#ffa600",

        error: "#b83d4e",
        errorActive: "#7a2934",
        errorContrast: "#ffffff",
        errorHover: "#993341",
        errorLight: "#faf0f1",
        errorText: "#b83d4e",

        offer: "#16b7c5",
        supplier: "#57caff",
        accommodation: "#006594",
      },
      dark: {
        cta: "#0096db",
        ctaActive: "#006594",
        ctaContrast: "#ffffff",
        ctaHover: "#007db7",
        ctaLight: "#ebf9ff",
        ctaLightActive: "#b8e8ff",
        ctaLightContrast: "#0096db", // same as cta
        ctaLightHover: "#d7f2ff",

        highlight: "#f1083b",
        highlightActive: "#a30528",
        highlightContrast: "#ffffff",
        highlightHover: "#c50730",
        highlightLight: "#fff0f3",
        highlightLightActive: "#fdc9d4",
        highlightLightContrast: "#f1083b", // same as highlight
        highlightLightHover: "#fedce4",

        theme: "#0096db",
        themeActive: "#006594",
        themeContrast: "#ffffff",
        themeHover: "#007db7",
        themeLight: "#ebf9ff",
        themeLightActive: "#b8e8ff",
        themeLightContrast: "#0096db", // same as theme
        themeLightHover: "#d7f2ff",

        background: "#0f172a",
        background100: "#1e293b",
        background200: "#334155",
        background300: "#475569",
        background400: "#64748b",
        background500: "#94a3b8",
        background600: "#cbd5e1",
        background700: "#e2e8f0",
        background800: "#f1f5f9",
        background900: "#f8fafc",

        text: "#ffffff",
        textDim: "#c9cccf",
        textStress: "#575c60",
        text100: "#f5f5f5",
        text200: "#eaebec",
        text300: "#c9cccf",
        text400: "#b7bbbe",
        text500: "#999fa3",
        text600: "#757c81",
        text700: "#575c60",
        text800: "#383b3e",
        text900: "#131516",
        textLink: "#0096db",
        textLinkActive: "#006594",
        textLinkContrast: "#ffffff",
        textLinkHover: "#007db7",

        info: "#306ec5",
        infoActive: "#204983",
        infoContrast: "#ffffff",
        infoHover: "#285ca4",
        infoLight: "#c4edff",
        infoText: "#306ec5",

        success: "#36bf78",
        successActive: "#247f50",
        successContrast: "#ffffff",
        successHover: "#2d9f64",
        successLight: "#c8fae3",
        successText: "#36bf78",

        warning: "#ffa600",
        warningActive: "#a36a00",
        warningContrast: "#131516",
        warningHover: "#d18800",
        warningLight: "#ffeac4",
        warningText: "#ffa600",

        error: "#b83d4e",
        errorActive: "#7a2934",
        errorContrast: "#ffffff",
        errorHover: "#993341",
        errorLight: "#facacf",
        errorText: "#b83d4e",

        offer: "#16b7c5",
        supplier: "#57caff",
        accommodation: "#006594",
      },
    };
  },
  computed: {
    /**
     * Get if the application is running on the dark theme.
     */
    darkMode() {
      return false;
    },
  },
};
</script>
