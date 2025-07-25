"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { generateTenantURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="bg-white">
        <ShoppingBagIcon className="text-black" />
      </Button>
    ),
  }
);

interface Props {
  slug: string;
}

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        {/* TODO: Skeleton for checkout button */}
        <Button disabled className="bg-white">
          <ShoppingBagIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
};
