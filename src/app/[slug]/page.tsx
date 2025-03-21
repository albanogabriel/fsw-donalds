import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <h1 className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div>
        {/* LOGO e TÍTULO */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />

          <h2 className="font-semibold">{restaurant.name}</h2>
        </div>

        {/* BEM-VINDO */}
        <div>
          <div className="space-y-2 pt-24 text-center">
            <div className="h3 text-2xl font-semibold">Seja Bem-vindo!</div>

            <p className="opacity-55">
              Escolha como prefere aproveitar sua refeição. Estamos a oferecer
              praticidade e savor em cada detalhe!
            </p>
          </div>
        </div>

        {/* TAKEAWAY or DINE IN */}
        <div className="grid grid-cols-2 gap-4 pt-14">
          <ConsumptionMethodOption
            slug={slug}
            buttonText="Para comer aqui"
            imageAlt="Comer aqui"
            imageUrl="/hamburger.png"
            option="DINE_IN"
          />

          <ConsumptionMethodOption
            slug={slug}
            buttonText="Para levar"
            imageAlt="Para levar"
            imageUrl="/takeaway.png"
            option="TAKEAWAY"
          />
        </div>
      </div>
    </h1>
  );
}
