/* @ds-bundle: {"format":3,"namespace":"HGCommunicationDesignSystem_e72957","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Stat","sourcePath":"components/display/Stat.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"0ce574873de0","components/buttons/IconButton.jsx":"66d04cabf58a","components/display/Avatar.jsx":"94f8d72123e7","components/display/Badge.jsx":"8825af843cac","components/display/Card.jsx":"2225c07c8449","components/display/Stat.jsx":"29093f994924","components/feedback/Alert.jsx":"299996a1ccd9","components/forms/Checkbox.jsx":"5c55d6aca998","components/forms/Input.jsx":"f12b986564b2","components/forms/Select.jsx":"b689d4cef39b","components/forms/Switch.jsx":"9a098ccbe41c","components/navigation/Tabs.jsx":"be45e08c01f3","ui_kits/portal/parts.jsx":"a5bc1c9fb664","ui_kits/website/parts.jsx":"df42b93d1f5e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HGCommunicationDesignSystem_e72957 = window.HGCommunicationDesignSystem_e72957 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    padding: '0 14px',
    font: 'var(--fs-sm)',
    radius: 'var(--radius-sm)',
    gap: 6
  },
  md: {
    height: 44,
    padding: '0 20px',
    font: 'var(--fs-body)',
    radius: 'var(--radius-md)',
    gap: 8
  },
  lg: {
    height: 52,
    padding: '0 28px',
    font: 'var(--fs-lg)',
    radius: 'var(--radius-md)',
    gap: 10
  }
};

/**
 * HG primary action button. Brand-green fill by default; secondary,
 * outline and ghost variants for lower emphasis.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const palettes = {
    primary: {
      bg: hover ? 'var(--color-brand-hover)' : 'var(--color-brand)',
      color: 'var(--color-on-brand)',
      border: '1px solid transparent',
      shadow: hover ? 'var(--shadow-brand)' : 'var(--shadow-xs)'
    },
    secondary: {
      bg: hover ? 'var(--green-950)' : 'var(--neutral-900)',
      color: '#fff',
      border: '1px solid transparent',
      shadow: 'var(--shadow-xs)'
    },
    outline: {
      bg: hover ? 'var(--color-brand-subtle)' : 'transparent',
      color: 'var(--color-brand-press)',
      border: '1.5px solid var(--border-brand)',
      shadow: 'none'
    },
    ghost: {
      bg: hover ? 'var(--surface-sunken)' : 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid transparent',
      shadow: 'none'
    },
    danger: {
      bg: hover ? 'var(--red-600)' : 'var(--red-500)',
      color: '#fff',
      border: '1px solid transparent',
      shadow: 'var(--shadow-xs)'
    }
  };
  const p = palettes[variant] || palettes.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: s.font,
      lineHeight: 1,
      letterSpacing: '0.01em',
      color: p.color,
      background: p.bg,
      border: p.border,
      borderRadius: s.radius,
      boxShadow: active ? 'var(--shadow-inset)' : p.shadow,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: active && !disabled ? 'translateY(1px)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 44,
  lg: 52
};

/**
 * Square icon-only button. Provide an accessible label.
 */
function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const dim = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const palettes = {
    primary: {
      bg: hover ? 'var(--color-brand-hover)' : 'var(--color-brand)',
      color: '#fff',
      border: '1px solid transparent'
    },
    outline: {
      bg: hover ? 'var(--color-brand-subtle)' : 'transparent',
      color: 'var(--color-brand-press)',
      border: '1.5px solid var(--border-brand)'
    },
    ghost: {
      bg: hover ? 'var(--surface-sunken)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    },
    subtle: {
      bg: hover ? 'var(--neutral-200)' : 'var(--neutral-100)',
      color: 'var(--text-heading)',
      border: '1px solid transparent'
    }
  };
  const p = palettes[variant] || palettes.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      color: p.color,
      background: p.bg,
      border: p.border,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64
};
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

/**
 * Circular avatar — image when `src` provided, else brand-tinted initials.
 */
function Avatar({
  name = '',
  src,
  size = 'md',
  style = {},
  ...rest
}) {
  const dim = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      flex: '0 0 auto',
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'var(--color-brand-subtle)',
      color: 'var(--color-brand-press)',
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--fw-bold)',
      fontSize: dim * 0.38,
      letterSpacing: '0.01em',
      border: '1px solid rgba(0,168,80,0.18)',
      userSelect: 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  brand: {
    bg: 'var(--color-brand-subtle)',
    fg: 'var(--color-brand-press)',
    bd: 'rgba(0,168,80,0.22)'
  },
  neutral: {
    bg: 'var(--neutral-100)',
    fg: 'var(--neutral-700)',
    bd: 'var(--border-subtle)'
  },
  success: {
    bg: 'var(--color-success-bg)',
    fg: 'var(--green-700)',
    bd: 'rgba(0,168,80,0.22)'
  },
  info: {
    bg: 'var(--color-info-bg)',
    fg: 'var(--blue-600)',
    bd: 'rgba(46,124,246,0.22)'
  },
  warning: {
    bg: 'var(--color-warning-bg)',
    fg: 'var(--amber-600)',
    bd: 'rgba(232,147,12,0.22)'
  },
  danger: {
    bg: 'var(--color-danger-bg)',
    fg: 'var(--red-600)',
    bd: 'rgba(217,45,32,0.22)'
  },
  solid: {
    bg: 'var(--color-brand)',
    fg: '#fff',
    bd: 'transparent'
  }
};

/**
 * Compact status / category label.
 */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: sm ? 20 : 24,
      padding: sm ? '0 8px' : '0 10px',
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: sm ? 'var(--fs-overline)' : 'var(--fs-xs)',
      letterSpacing: '0.01em',
      color: t.fg,
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. `interactive` adds hover elevation for clickable cards.
 */
function Card({
  children,
  padding = 'lg',
  interactive = false,
  elevation = 'sm',
  style = {},
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const shadows = {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding] ?? pads.lg,
      boxShadow: interactive && hover ? 'var(--shadow-lg)' : shadows[elevation],
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KPI / metric tile: big value with label and optional trend delta.
 */
function Stat({
  label,
  value,
  delta,
  trend = 'up',
  icon = null,
  style = {},
  ...rest
}) {
  const positive = trend === 'up';
  const trendColor = positive ? 'var(--green-700)' : 'var(--red-600)';
  const trendBg = positive ? 'var(--color-success-bg)' : 'var(--color-danger-bg)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--color-brand-subtle)',
      color: 'var(--color-brand-press)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-muted)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-extra)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      padding: '2px 7px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: trendColor,
      background: trendBg
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    fill: "none",
    style: {
      transform: positive ? 'none' : 'rotate(180deg)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 2.5v7M3 5l3-2.5L9 5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), delta)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  info: {
    bg: 'var(--color-info-bg)',
    bd: 'rgba(46,124,246,0.25)',
    fg: 'var(--blue-600)',
    ink: 'var(--neutral-800)'
  },
  success: {
    bg: 'var(--color-success-bg)',
    bd: 'rgba(0,168,80,0.25)',
    fg: 'var(--green-700)',
    ink: 'var(--neutral-800)'
  },
  warning: {
    bg: 'var(--color-warning-bg)',
    bd: 'rgba(232,147,12,0.28)',
    fg: 'var(--amber-600)',
    ink: 'var(--neutral-800)'
  },
  danger: {
    bg: 'var(--color-danger-bg)',
    bd: 'rgba(217,45,32,0.25)',
    fg: 'var(--red-600)',
    ink: 'var(--neutral-800)'
  }
};
const ICONS = {
  info: 'M10 9v5M10 6.5h.01M10 18a8 8 0 100-16 8 8 0 000 16z',
  success: 'M6 10.5l2.5 2.5L14.5 7M10 18a8 8 0 100-16 8 8 0 000 16z',
  warning: 'M10 7.5v4M10 14.5h.01M10 2.5L1.5 17h17L10 2.5z',
  danger: 'M10 7v4M10 14.5h.01M10 18a8 8 0 100-16 8 8 0 000 16z'
};

/**
 * Inline message banner with semantic tone.
 */
function Alert({
  children,
  tone = 'info',
  title,
  onClose,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    style: {
      flex: '0 0 auto',
      color: t.fg,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: ICONS[tone],
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-heading)',
      marginBottom: 2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: t.ink,
      lineHeight: 'var(--lh-body)'
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      flex: '0 0 auto',
      width: 24,
      height: 24,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l8 8M11 3l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox with optional label. Controlled via `checked`/`onChange`.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      flex: '0 0 auto',
      background: on ? 'var(--color-brand)' : 'var(--surface-card)',
      border: `1.5px solid ${on ? 'var(--color-brand)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-xs)',
      transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: handle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 14 14",
    fill: "none",
    style: {
      opacity: on ? 1 : 0,
      transition: 'opacity var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 7.5l3 3 6-6.5",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    font: 'var(--fs-sm)',
    pad: '0 12px'
  },
  md: {
    height: 44,
    font: 'var(--fs-body)',
    pad: '0 14px'
  },
  lg: {
    height: 52,
    font: 'var(--fs-lg)',
    pad: '0 16px'
  }
};

/**
 * Text input with label, helper/error text and optional adornments.
 */
function Input({
  label,
  size = 'md',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  helperText,
  error,
  disabled = false,
  required = false,
  iconLeft = null,
  iconRight = null,
  id,
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--color-danger)' : focus ? 'var(--color-brand)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-danger)',
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: s.height,
      padding: s.pad,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      opacity: disabled ? 0.6 : 1
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: s.font,
      color: 'var(--text-heading)'
    }
  }, rest)), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, iconRight)), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: invalid ? 'var(--color-danger)' : 'var(--text-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Native select styled to match HG inputs.
 */
function Select({
  label,
  size = 'md',
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  error,
  id,
  style = {},
  ...rest
}) {
  const heights = {
    sm: 36,
    md: 44,
    lg: 52
  };
  const fonts = {
    sm: 'var(--fs-sm)',
    md: 'var(--fs-body)',
    lg: 'var(--fs-lg)'
  };
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const invalid = Boolean(error);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: heights[size],
      padding: '0 40px 0 14px',
      fontFamily: 'var(--font-body)',
      fontSize: fonts[size],
      color: 'var(--text-heading)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1.5px solid ${invalid ? 'var(--color-danger)' : focus ? 'var(--color-brand)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--color-danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Toggle switch. Controlled via `checked`/`onChange`.
 */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  id,
  style = {}
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const dims = size === 'sm' ? {
    w: 36,
    h: 20,
    k: 14
  } : {
    w: 44,
    h: 24,
    k: 18
  };
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    id: fieldId,
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: dims.w,
      height: dims.h,
      padding: 0,
      flex: '0 0 auto',
      background: on ? 'var(--color-brand)' : 'var(--neutral-300)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: 'inherit',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: (dims.h - dims.k) / 2,
      left: on ? dims.w - dims.k - (dims.h - dims.k) / 2 : (dims.h - dims.k) / 2,
      width: dims.k,
      height: dims.k,
      background: '#fff',
      borderRadius: '50%',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-emphasis)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Underline tab bar. Controlled (`value`/`onChange`) or uncontrolled.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const first = tabs[0] && (typeof tabs[0] === 'string' ? tabs[0] : tabs[0].value);
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, tabs.map(tb => {
    const t = typeof tb === 'string' ? {
      value: tb,
      label: tb
    } : tb;
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(t.value),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '12px 14px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--fs-sm)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)',
        color: on ? 'var(--color-brand-press)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-standard)'
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-overline)',
        fontWeight: 'var(--fw-bold)',
        padding: '1px 6px',
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--color-brand-subtle)' : 'var(--neutral-100)',
        color: on ? 'var(--color-brand-press)' : 'var(--text-muted)'
      }
    }, t.count), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: -1,
        height: 2.5,
        borderRadius: 2,
        background: on ? 'var(--color-brand)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-standard)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/parts.jsx
try { (() => {
/* HG Telecommunication — Customer portal / NOC dashboard.
   Composes design-system primitives from window.HGCommunicationDesignSystem_e72957. */
const DSP = window.HGCommunicationDesignSystem_e72957;
const {
  Button,
  IconButton,
  Input,
  Badge,
  Card,
  Stat,
  Avatar,
  Tabs,
  Alert,
  Switch
} = DSP;
const PIc = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  signal: 'M4 20v-3M9 20v-7M14 20v-11M19 20V5',
  ticket: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 000-4z',
  invoice: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
  cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v2.5M12 19.5V22M4 12H1.5M22.5 12H20M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4-4',
  bell: 'M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0',
  plus: 'M12 5v14M5 12h14',
  arrow: 'M4 12h15M13 6l6 6-6 6',
  bolt: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  logout: 'M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M4 12h11',
  lock: 'M6 10V8a6 6 0 1112 0v2M5 10h14v10H5zM12 14v3',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18'
};
function PIcon({
  name,
  size = 20,
  stroke = 1.7
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: PIc[name],
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

/* ------------------------------- Login ------------------------------- */
function Login({
  onLogin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-logo-lockup-light.png",
    alt: "HG Telecommunication",
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 30,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '32px 0 6px'
    }
  }, "Sign in to your portal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15.5,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Manage your services, tickets and billing in one place."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    type: "email",
    defaultValue: "ops@northgate.pk"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Remember me",
    defaultChecked: true,
    size: "sm"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-link)',
      textDecoration: 'none'
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onLogin,
    iconRight: /*#__PURE__*/React.createElement(PIcon, {
      name: "arrow",
      size: 17
    })
  }, "Sign in")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 24,
      textAlign: 'center'
    }
  }, "New to HG? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      color: 'var(--text-link)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "Activate your account")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-inverse)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 48
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-monogram-green.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -80,
      top: -60,
      width: 360,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "99.98% uptime \u2014 last 90 days"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 26,
      lineHeight: 1.35,
      color: '#fff',
      letterSpacing: '-0.01em',
      marginTop: 20
    }
  }, "\"HG's portal gives our team real-time visibility into every site and a single place to raise faults.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Sana Khan"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 15,
      color: '#fff'
    }
  }, "Sana Khan"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-on-dark-muted)'
    }
  }, "IT Manager, Northgate Retail"))))));
}

/* ------------------------------- Shell ------------------------------- */
const NAV = [['grid', 'Overview'], ['signal', 'Services'], ['ticket', 'Tickets'], ['invoice', 'Billing'], ['cog', 'Settings']];
function Sidebar({
  active,
  onNav
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: '0 0 248px',
      background: 'var(--surface-inverse)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '0 8px 22px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-monogram-green.png",
    alt: "HG",
    style: {
      width: 34
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 16,
      color: '#fff',
      letterSpacing: '0.01em'
    }
  }, "HG Portal")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, NAV.map(([icon, label]) => {
    const on = active === label;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => onNav(label),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 12px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        textAlign: 'left',
        background: on ? 'rgba(0,168,80,0.16)' : 'transparent',
        color: on ? '#fff' : 'var(--text-on-dark-muted)',
        fontFamily: 'var(--font-heading)',
        fontWeight: on ? 700 : 500,
        fontSize: 14.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? 'var(--green-300)' : 'var(--text-on-dark-muted)'
      }
    }, /*#__PURE__*/React.createElement(PIcon, {
      name: icon,
      size: 19
    })), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-lg)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 14,
      color: '#fff'
    }
  }, "Need a hand?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-on-dark-muted)',
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "Our NOC is online 24/7."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    fullWidth: true
  }, "Contact support"))));
}
function Topbar({
  title,
  onLogout
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 68,
      flex: '0 0 68px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 28px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 21,
      letterSpacing: '-0.01em',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "search",
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search sites, tickets\u2026",
    style: {
      width: '100%',
      height: 40,
      padding: '0 12px 0 36px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-default)',
      background: 'var(--surface-card)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-heading)',
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifications",
    variant: "subtle"
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "bell",
    size: 19
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Sign out",
    variant: "ghost",
    onClick: onLogout
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "logout",
    size: 19
  })), /*#__PURE__*/React.createElement(Avatar, {
    name: "Sana Khan"
  })));
}

/* ------------------------------ Screens ------------------------------ */
const SITES = [['Head Office — Lahore', 'Business Fibre 500', '10.0.4.21', 'success', 'Operational'], ['Warehouse — Karachi', 'Dedicated 1 Gbps', '10.0.8.4', 'success', 'Operational'], ['Branch — Islamabad', 'Business Fibre 200', '10.0.2.9', 'warning', 'Degraded'], ['Cloud Voice — PBX', '24 SIP seats', 'sip.hg.pk', 'success', 'Operational']];
const TICKETS = [['HG-4821', 'Intermittent latency on Islamabad branch link', 'In progress', 'warning', 'P2 · Network', '2h ago'], ['HG-4815', 'Add 6 new SIP seats for sales team', 'Open', 'info', 'P3 · Voice', '5h ago'], ['HG-4790', 'Firewall rule change request', 'Resolved', 'success', 'P3 · Security', 'Yesterday'], ['HG-4772', 'Quarterly bandwidth review', 'Resolved', 'success', 'P4 · Account', '3 days ago']];
const INVOICES = [['INV-2026-0312', 'Mar 2026', 'Rs 248,900', 'Paid', 'success'], ['INV-2026-0241', 'Feb 2026', 'Rs 248,900', 'Paid', 'success'], ['INV-2026-0177', 'Jan 2026', 'Rs 236,400', 'Paid', 'success'], ['INV-2026-0420', 'Apr 2026', 'Rs 251,300', 'Due in 6 days', 'warning']];
function SectionTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--text-heading)',
      margin: 0
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, action));
}
function Overview() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "warning",
    title: "Degraded service \u2014 Islamabad branch"
  }, "We've detected elevated latency on your Islamabad link (HG-4821). Our NOC is investigating; no action needed from your team."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Network uptime",
    value: "99.98%",
    delta: "+0.02%",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(PIcon, {
      name: "bolt",
      size: 15
    })
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Active sites",
    value: "4",
    delta: "+1",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(PIcon, {
      name: "globe",
      size: 15
    })
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Open tickets",
    value: "2",
    delta: "-3",
    trend: "down",
    icon: /*#__PURE__*/React.createElement(PIcon, {
      name: "ticket",
      size: 15
    })
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Usage this month",
    value: "8.4 TB",
    delta: "+12%",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(PIcon, {
      name: "signal",
      size: 15
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, "Your services"), /*#__PURE__*/React.createElement(ServicesTable, {
    rows: SITES
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "All tickets")
  }, "Recent tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, TICKETS.slice(0, 3).map(t => /*#__PURE__*/React.createElement("div", {
    key: t[0],
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingBottom: 12,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, t[0]), /*#__PURE__*/React.createElement(Badge, {
    tone: t[3],
    size: "sm"
  }, t[2]), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-faint)'
    }
  }, t[5])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-body)',
      lineHeight: 1.4
    }
  }, t[1])))))));
}
function ServicesTable({
  rows
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1.2fr 1fr auto',
      gap: 12,
      padding: '0 0 10px',
      fontFamily: 'var(--font-heading)',
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Site"), /*#__PURE__*/React.createElement("span", null, "Plan"), /*#__PURE__*/React.createElement("span", null, "Address"), /*#__PURE__*/React.createElement("span", null, "Status")), rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1.2fr 1fr auto',
      gap: 12,
      alignItems: 'center',
      padding: '13px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-body)'
    }
  }, r[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, r[2]), /*#__PURE__*/React.createElement(Badge, {
    tone: r[3],
    dot: true,
    size: "sm"
  }, r[4]))));
}
function ServicesScreen() {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(PIcon, {
        name: "plus",
        size: 15
      })
    }, "Add a site")
  }, "All services & sites"), /*#__PURE__*/React.createElement(ServicesTable, {
    rows: SITES
  }));
}
function TicketsScreen() {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(PIcon, {
        name: "plus",
        size: 15
      })
    }, "New ticket")
  }, "Support tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1.6fr auto auto auto',
      gap: 14,
      padding: '0 0 10px',
      fontFamily: 'var(--font-heading)',
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "ID"), /*#__PURE__*/React.createElement("span", null, "Subject"), /*#__PURE__*/React.createElement("span", null, "Priority"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Updated")), TICKETS.map(t => /*#__PURE__*/React.createElement("div", {
    key: t[0],
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1.6fr auto auto auto',
      gap: 14,
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, t[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, t[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, t[4]), /*#__PURE__*/React.createElement(Badge, {
    tone: t[3],
    size: "sm"
  }, t[2]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-faint)'
    }
  }, t[5]))));
}
function BillingScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Current balance",
    value: "Rs 251,300"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Next invoice",
    value: "Apr 30"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Avg. monthly",
    value: "Rs 246,400",
    delta: "+2.1%",
    trend: "up"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Download all")
  }, "Invoices"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto auto',
      gap: 14,
      padding: '0 0 10px',
      fontFamily: 'var(--font-heading)',
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Invoice"), /*#__PURE__*/React.createElement("span", null, "Period"), /*#__PURE__*/React.createElement("span", null, "Amount"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null)), INVOICES.map(iv => /*#__PURE__*/React.createElement("div", {
    key: iv[0],
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto auto',
      gap: 14,
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, iv[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, iv[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-heading)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, iv[2]), /*#__PURE__*/React.createElement(Badge, {
    tone: iv[4],
    dot: true,
    size: "sm"
  }, iv[3]), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 13.5,
      color: 'var(--text-link)',
      textDecoration: 'none',
      justifySelf: 'end'
    }
  }, "View")))));
}
function SettingsScreen() {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Notification preferences"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18
    }
  }, [['Network status alerts', 'Email me when a site changes status', true], ['Ticket updates', 'Notify me on replies to my tickets', true], ['Billing reminders', 'Remind me 7 days before an invoice is due', true], ['Product news', 'Occasional updates about new HG services', false]].map(([t, d, on]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      paddingBottom: 16,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-heading)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, d)), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: on
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Save changes"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Cancel")));
}
function Portal({
  onLogout
}) {
  const [nav, setNav] = React.useState('Overview');
  const screens = {
    Overview: /*#__PURE__*/React.createElement(Overview, null),
    Services: /*#__PURE__*/React.createElement(ServicesScreen, null),
    Tickets: /*#__PURE__*/React.createElement(TicketsScreen, null),
    Billing: /*#__PURE__*/React.createElement(BillingScreen, null),
    Settings: /*#__PURE__*/React.createElement(SettingsScreen, null)
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: nav,
    onNav: setNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: nav,
    onLogout: onLogout
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 28
    }
  }, screens[nav])));
}
Object.assign(window, {
  Login,
  Portal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/parts.jsx
try { (() => {
/* HG Telecommunication — Marketing website parts.
   Composes design-system primitives from window.HGCommunicationDesignSystem_e72957. */
const DS = window.HGCommunicationDesignSystem_e72957;
const {
  Button,
  Badge,
  Card,
  Input
} = DS;

/* ---------- inline line icons (Lucide-style, currentColor) ---------- */
const Ic = {
  fibre: 'M3 12h4l2-7 4 14 2-7h6',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18',
  phone: 'M5 4h3l1.5 5-2 1.5a12 12 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  server: 'M4 4h16v5H4zM4 13h16v5H4zM7.5 6.5h.01M7.5 15.5h.01',
  network: 'M6 7a2 2 0 100-4 2 2 0 000 4zM18 7a2 2 0 100-4 2 2 0 000 4zM12 21a2 2 0 100-4 2 2 0 000 4zM7 6l4 9M17 6l-4 9',
  shield: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z',
  check: 'M5 12.5l4 4 10-10',
  arrow: 'M4 12h15M13 6l6 6-6 6',
  bolt: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
  pin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z'
};
function Icon({
  name,
  size = 22,
  stroke = 1.7,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      color,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: Ic[name],
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
const wrap = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px'
};

/* ---------------------------- Header ---------------------------- */
function SiteHeader() {
  const links = ['Services', 'Solutions', 'Plans', 'Support', 'Company'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-logo-lockup-light.png",
    alt: "HG Telecommunication",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      marginLeft: 8
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 15,
      fontWeight: 600,
      color: l === 'Services' ? 'var(--color-brand-press)' : 'var(--text-body)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: 'var(--font-heading)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16
  }), " 0800-HG-NET"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 15
    })
  }, "Get started"))));
}

/* ----------------------------- Hero ----------------------------- */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'linear-gradient(180deg, var(--green-50) 0%, var(--surface-card) 70%)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      paddingTop: 72,
      paddingBottom: 80,
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "hg-overline",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      background: 'var(--color-brand-subtle)',
      borderRadius: 'var(--radius-pill)',
      color: 'var(--color-brand-press)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--color-brand)'
    }
  }), " ENTERPRISE CONNECTIVITY"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 56,
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '18px 0 0'
    }
  }, "Connectivity your business can count on."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 520,
      margin: '20px 0 0'
    }
  }, "Managed fibre, cloud voice and IT services \u2014 monitored around the clock by our NOC and backed by a 99.9% uptime SLA."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 17
    })
  }, "Check coverage"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "View plans")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      marginTop: 44
    }
  }, [['99.98%', 'Uptime last 90 days'], ['1,284', 'Active business sites'], ['24/7', 'NOC monitoring']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 28,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, l))))), /*#__PURE__*/React.createElement(HeroPanel, null)));
}
function HeroPanel() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-2xl)',
      background: 'var(--surface-inverse)',
      padding: 28,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-monogram-green.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -60,
      bottom: -60,
      width: 320,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, "Network status"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "All systems operational")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      marginTop: 18
    }
  }, [['Lahore Core', '10.0.4.21', 'Operational'], ['Karachi Core', '10.0.8.4', 'Operational'], ['Islamabad Edge', '10.0.2.9', 'Operational'], ['Cloud Voice', 'sip.hg.pk', 'Operational']].map(([n, ip, s]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--color-brand)',
      boxShadow: '0 0 0 4px rgba(0,168,80,0.18)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 14,
      color: '#fff'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, ip), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--green-300)'
    }
  }, s))))));
}

/* --------------------------- Services --------------------------- */
const SERVICES = [['fibre', 'Managed Fibre', 'Symmetric business fibre up to 10 Gbps with proactive monitoring and same-day fault response.'], ['globe', 'Dedicated Internet', 'Uncontended dedicated bandwidth with a static IP block and a 99.9% availability SLA.'], ['phone', 'Cloud Voice & PBX', 'Hosted PBX, SIP trunks and softphones — keep your numbers, drop the hardware.'], ['server', 'Managed IT', 'Servers, endpoints and cloud workloads managed and patched by our engineers.'], ['network', 'Networking & SD-WAN', 'Multi-site SD-WAN, switching and Wi-Fi designed, deployed and supported end to end.'], ['shield', 'Cybersecurity', 'Managed firewalls, threat monitoring and email security to keep your business protected.']];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '96px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hg-overline"
  }, "WHAT WE DO"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)',
      margin: '10px 0 0'
    }
  }, "One partner for connectivity and IT"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      marginTop: 12
    }
  }, "From the fibre in the ground to the cloud you run on \u2014 HG designs, delivers and manages it all, with a single support team that knows your business.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20,
      marginTop: 40
    }
  }, SERVICES.map(([icon, title, desc]) => /*#__PURE__*/React.createElement(Card, {
    key: title,
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-brand-subtle)',
      color: 'var(--color-brand-press)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--text-heading)',
      margin: '18px 0 0'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '8px 0 0'
    }
  }, desc), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-link)',
      textDecoration: 'none'
    }
  }, "Learn more ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }))))));
}

/* -------------------------- Stats band -------------------------- */
function StatsBand() {
  const items = [['bolt', '99.9%', 'Uptime SLA'], ['clock', '< 15 min', 'Avg. response time'], ['pin', '12 cities', 'Nationwide coverage'], ['globe', '24/7', 'NOC monitoring']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '64px 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, items.map(([icon, v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 40,
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--text-on-dark-muted)'
    }
  }, l)))));
}

/* ---------------------------- Plans ----------------------------- */
const PLANS = [['Starter', 'Rs 9,500', 'For small offices getting online', ['Business Fibre 100 Mbps', '1 static IP', 'Email support', '99.5% uptime SLA'], false], ['Business', 'Rs 24,900', 'For growing teams across sites', ['Business Fibre 500 Mbps', '/29 static IP block', 'Cloud Voice — 10 seats', '24/7 priority support', '99.9% uptime SLA'], true], ['Enterprise', "Let's talk", 'Tailored connectivity + managed IT', ['Dedicated 1–10 Gbps', 'Multi-site SD-WAN', 'Managed IT & security', 'Dedicated account engineer'], false]];
function Plans() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '96px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 600,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hg-overline"
  }, "PLANS"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)',
      margin: '10px 0 0'
    }
  }, "Simple plans, serious uptime"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--text-body)',
      marginTop: 12
    }
  }, "Transparent monthly pricing. No setup fees on annual contracts.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20,
      marginTop: 40,
      alignItems: 'start'
    }
  }, PLANS.map(([name, price, desc, feats, popular]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      position: 'relative',
      background: popular ? 'var(--surface-inverse)' : 'var(--surface-card)',
      border: popular ? 'none' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 28,
      boxShadow: popular ? 'var(--shadow-xl)' : 'var(--shadow-sm)'
    }
  }, popular && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 20,
      right: 20
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "solid"
  }, "Most popular")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 18,
      color: popular ? '#fff' : 'var(--text-heading)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: popular ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      marginTop: 4,
      minHeight: 38
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      margin: '14px 0 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 34,
      letterSpacing: '-0.02em',
      color: popular ? '#fff' : 'var(--text-strong)'
    }
  }, price), price.startsWith('Rs') && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: popular ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, "/mo")), /*#__PURE__*/React.createElement(Button, {
    variant: popular ? 'primary' : 'outline',
    fullWidth: true
  }, price.startsWith('Rs') ? 'Choose ' + name : 'Contact sales'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 11,
      marginTop: 22
    }
  }, feats.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: popular ? 'var(--green-300)' : 'var(--color-brand)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17,
    stroke: 2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      color: popular ? 'var(--text-on-dark)' : 'var(--text-body)'
    }
  }, f))))))));
}

/* ---------------------- CTA + Footer ---------------------- */
function CtaFooter() {
  const cols = [['Services', ['Managed Fibre', 'Dedicated Internet', 'Cloud Voice', 'Managed IT', 'Cybersecurity']], ['Company', ['About HG', 'Coverage', 'Careers', 'Newsroom', 'Contact']], ['Support', ['Help centre', 'Network status', 'Report a fault', 'Billing', 'Service portal']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '72px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40,
      paddingBottom: 56,
      borderBottom: '1px solid rgba(255,255,255,0.10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/hg-logo-lockup-onDark.png",
    alt: "HG Telecommunication",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-muted)',
      maxWidth: 300,
      marginTop: 18
    }
  }, "Enterprise connectivity and managed IT for businesses across Pakistan. Always-on, SLA-backed, monitored 24/7."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20,
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Work email",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Subscribe"))), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#fff'
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      marginTop: 16
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      color: 'var(--text-on-dark-muted)',
      textDecoration: 'none'
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-on-dark-muted)'
    }
  }, "\xA9 2026 HG Telecommunication (Private) Limited. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22
    }
  }, ['Privacy', 'Terms', 'SLA'].map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      color: 'var(--text-on-dark-muted)',
      textDecoration: 'none'
    }
  }, i))))));
}
Object.assign(window, {
  SiteHeader,
  Hero,
  Services,
  StatsBand,
  Plans,
  CtaFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/parts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
