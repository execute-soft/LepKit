# UIX Migration Examples

## React Primitive

Before:

```ts
import { Button } from "@/components/ui/button";
```

After:

```ts
import { Button } from "@repo/uix/react/primitives";
```

## React Layout

Before:

```ts
import AppLoadingScreen from "@/components/app/AppLoadingScreen";
```

After:

```ts
import { AppLoadingScreen } from "@repo/uix/react/layout";
```

## React Data Table

Before:

```ts
import { DataTable } from "@repo/uix/components/data-table/DataTable";
```

After:

```ts
import { DataTable } from "@repo/uix/react/data-table";
```

## React Forms

Before:

```ts
import FormikInputBox from "@repo/uix/components/Formik/FormikInputBox";
```

After:

```ts
import { FormikInputBox } from "@repo/uix/react/forms";
```

## Commerce Helpers

Before:

```ts
import { formatCurrency } from "@/lib/currency";
```

After:

```ts
import { formatCurrency } from "@repo/uix/commerce";
```

## Solid Safe Imports

Use the Solid-safe entry point for framework-neutral UIX APIs:

```ts
import { formatCurrency, storefrontUi } from "@repo/uix/solid";
```

Do not import React entry points such as `@repo/uix/react/*` from Solid apps.

