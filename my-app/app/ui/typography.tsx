import React from "react";

export function TypographyH1({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl lg:text-4xl font-bold tracking-tight first:mt-0 border-none capitalize">
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
