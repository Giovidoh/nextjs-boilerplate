"use client";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { FormField } from "@/components/forms/form-field";
import { OtpInput } from "@/components/forms/otp-input";
import { PasswordInput } from "@/components/forms/password-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;
const buttonSizes = ["sm", "default", "lg"] as const;
const colorTokens = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "success",
  "warning",
  "info",
  "border",
  "ring",
] as const;
// Literal class names so Tailwind can detect them.
const typeScale = [
  ["display", "text-display font-heading font-semibold"],
  ["h1", "text-h1 font-heading font-semibold"],
  ["h2", "text-h2 font-heading font-semibold"],
  ["h3", "text-h3 font-heading font-semibold"],
  ["h4", "text-h4 font-heading font-semibold"],
  ["lead", "text-lead"],
  ["body", "text-body"],
  ["small", "text-small"],
  ["caption", "text-caption"],
] as const;

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t py-10">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-h3">{title}</h2>
        {description && <p className="max-w-3xl text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

const demoSchema = z.object({
  email: z.email("email"),
  password: z.string().min(1, "required"),
  plan: z.string().min(1, "required"),
  terms: z.literal(true, "required"),
});
type DemoValues = z.input<typeof demoSchema>;

function DemoForm() {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { email: "", password: "", plan: "", terms: false as unknown as true },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((values) =>
        toast.success("Form submitted", { description: JSON.stringify(values) }),
      )}
      className="max-w-md"
    >
      <FieldGroup>
        <FormField control={form.control} name="email" label="Email" description="We never share it.">
          {(field) => <Input type="email" {...field} />}
        </FormField>
        <FormField control={form.control} name="password" label="Password">
          {(field) => <PasswordInput showStrength {...field} />}
        </FormField>
        <FormField control={form.control} name="plan" label="Plan">
          {({ value, onChange, ref, ...field }) => (
            <Select
              items={[
                { value: "free", label: "Free" },
                { value: "pro", label: "Pro" },
              ]}
              value={value || null}
              onValueChange={(next) => onChange(next ?? "")}
              inputRef={ref}
            >
              <SelectTrigger {...field} className="w-full">
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField
          control={form.control}
          name="terms"
          label="I accept the terms"
          orientation="horizontal"
          labelPlacement="after"
        >
          {({ value, onChange, ref, ...field }) => (
            <Checkbox {...field} inputRef={ref} checked={value} onCheckedChange={onChange} />
          )}
        </FormField>
        <SubmitButton pending={form.formState.isSubmitting}>Submit</SubmitButton>
      </FieldGroup>
    </form>
  );
}

export function Showcase() {
  return (
    <TooltipProvider>
      <div className="page-container py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex flex-col gap-1">
            <Logo />
            <h1 className="text-h2">UI kit</h1>
            <p className="text-muted-foreground">
              Every value on this page comes from <code className="font-mono">styles/theme.css</code>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle variant="outline" />
          </div>
        </header>

        <Section id="colors" title="Colors" description="Semantic color tokens (light / dark).">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {colorTokens.map((token) => (
              <div key={token} className="flex flex-col gap-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ background: `var(--${token})` }}
                />
                <code className="text-caption text-muted-foreground">--{token}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section id="typography" title="Typography" description="Fluid type scale: text-display, text-h1 … text-caption.">
          <div className="flex flex-col gap-4">
            {typeScale.map(([name, className]) => (
              <div key={name} className="flex items-baseline gap-6">
                <code className="w-20 shrink-0 text-caption text-muted-foreground">{name}</code>
                <p className={className}>The quick brown fox</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="buttons" title="Buttons" description="Variants × sizes. Height, radius and padding come from --control-* / --button-* tokens.">
          <div className="flex flex-col gap-4">
            {buttonSizes.map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-3">
                {buttonVariants.map((variant) => (
                  <Button key={variant} variant={variant} size={size}>
                    {variant}
                  </Button>
                ))}
                <Button size={size === "default" ? "icon" : (`icon-${size}` as const)} aria-label="Add">
                  <PlusIcon />
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <MailIcon data-icon="inline-start" /> With icon
              </Button>
              <SubmitButton pending>Loading</SubmitButton>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Section>

        <Section id="inputs" title="Inputs" description="All controls share --control-height, --input-radius and --input-bg.">
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="ui-input">Input</FieldLabel>
              <Input id="ui-input" placeholder="Placeholder" />
            </Field>
            <Field>
              <FieldLabel htmlFor="ui-search">Input group</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput id="ui-search" placeholder="Search…" />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Select</FieldLabel>
              <Select items={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="ui-invalid">Invalid</FieldLabel>
              <Input id="ui-invalid" aria-invalid defaultValue="wrong@" />
            </Field>
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="ui-textarea">Textarea</FieldLabel>
              <Textarea id="ui-textarea" placeholder="Write something…" />
            </Field>
            <div className="flex flex-wrap items-center gap-6 md:col-span-2">
              <Label className="gap-2">
                <Checkbox defaultChecked /> Checkbox
              </Label>
              <Label className="gap-2">
                <Switch defaultChecked /> Switch
              </Label>
              <RadioGroup defaultValue="one" className="flex gap-4">
                <Label className="gap-2">
                  <RadioGroupItem value="one" /> One
                </Label>
                <Label className="gap-2">
                  <RadioGroupItem value="two" /> Two
                </Label>
              </RadioGroup>
            </div>
          </div>
        </Section>

        <Section id="composites" title="Composite inputs" description="Built on the primitives, with per-slot classNames.">
          <div className="grid max-w-3xl gap-8 md:grid-cols-2">
            <Field>
              <FieldLabel>Password + strength</FieldLabel>
              <PasswordInput showStrength placeholder="Type a password" />
            </Field>
            <Field>
              <FieldLabel>OTP (groups 3-3)</FieldLabel>
              <OtpInput groups={[3, 3]} />
            </Field>
          </div>
        </Section>

        <Section id="form" title="Form" description="react-hook-form + zod + FormField: labels, ids, aria and translated errors handled.">
          <DemoForm />
        </Section>

        <Section
          id="customization"
          title="Customization levels"
          description="1. tokens on a subtree · 2. variants · 3. slots (classNames) · 4. composition (render)."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>1 · Token override on a subtree</CardTitle>
                <CardDescription>Same components, different design — no component edited.</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="flex flex-col gap-3 rounded-lg border p-4"
                  style={
                    {
                      "--primary": "oklch(0.55 0.2 150)",
                      "--button-radius": "999px",
                      "--input-radius": "999px",
                      "--control-height": "3rem",
                      "--control-padding-x": "1.5rem",
                      "--button-font-weight": "700",
                    } as CSSProperties
                  }
                >
                  <Input placeholder="Pill input" />
                  <Button>Pill button</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3 · Slots</CardTitle>
                <CardDescription>
                  <code className="font-mono">{`classNames={{ group, toggle, meterSegment }}`}</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PasswordInput
                  showStrength
                  defaultValue="Hello1"
                  classNames={{
                    group: "rounded-none border-x-0 border-t-0",
                    toggle: "text-primary",
                    meterSegment: "h-2",
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4 · Composition</CardTitle>
                <CardDescription>A Button rendered as a link, a menu, a dialog.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button nativeButton={false} render={<a href="#colors" />} variant="outline">
                  Button as link
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" />}>Menu</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2Icon /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" />}>Dialog</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                      <DialogClose render={<Button variant="destructive" />}>Delete</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" />}>Tooltip</TooltipTrigger>
                  <TooltipContent>Helpful hint</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>Padding and radius from --card-padding / --card-radius.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>GD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Jane Doe</span>
                  <span className="text-small text-muted-foreground">jane@example.com</span>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Section id="feedback" title="Feedback">
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge>default</Badge>
              <Badge variant="secondary">secondary</Badge>
              <Badge variant="outline">outline</Badge>
              <Badge variant="destructive">destructive</Badge>
              <Badge className="bg-success text-success-foreground">success</Badge>
              <Badge className="bg-warning text-warning-foreground">warning</Badge>
            </div>
            <Alert>
              <MailIcon />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Alerts use the card and border tokens.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>Destructive variant.</AlertDescription>
            </Alert>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => toast.success("Saved")}>
                Toast success
              </Button>
              <Button variant="outline" onClick={() => toast.error("Failed", { description: "Details" })}>
                Toast error
              </Button>
              <Spinner />
            </div>
            <Progress value={60} />
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </Section>

        <Section id="navigation" title="Tabs">
          <Tabs defaultValue="account" className="max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="text-muted-foreground">
              Account settings.
            </TabsContent>
            <TabsContent value="billing" className="text-muted-foreground">
              Billing settings.
            </TabsContent>
          </Tabs>
        </Section>
      </div>
    </TooltipProvider>
  );
}
