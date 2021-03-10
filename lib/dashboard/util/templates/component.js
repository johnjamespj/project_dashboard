module.exports = (componentName) => ({
  content: `// Generated with util/create-component.js
import React from "react";

import type { ${componentName}Props } from "./${componentName}.types";

import useStyles from "./${componentName}.atom";

function ${componentName}({ foo }: ${componentName}Props){
  const classes = useStyles()

  return <div className={classes.root} />
}

export default ${componentName};

`,
  extension: `.tsx`
});
