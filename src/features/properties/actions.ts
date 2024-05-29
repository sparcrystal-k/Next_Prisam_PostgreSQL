"use server";

import { action } from "@/lib/safe-action";
import { prisma } from "@/db";
import { Property, propertyInputSchema } from "./schema";
import { z } from "zod";
import { getCurrentUser } from "@/core/auth/server";
import { getMatchedRequestsOfProperty } from "../requests/actions";

export async function getProperty(propertyId: string): Promise<Property> {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
    },
    include: { category: true, owner: true, images: true },
  });

  return property;
}

export async function getProperties(): Promise<Property[]> {
  const property = await prisma.property.findMany({
    orderBy: {
      id: "desc",
    },
    include: { images: true },
  });

  return property;
}

export async function getMyProperties(): Promise<Property[]> {
  const user = await getCurrentUser();

  const properties = await prisma.property.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      owner_id: user.id,
    },
    include: { category: true, owner: true, images: true },
  });

  return await Promise.all(
    properties.map(async (property) => {
      const matchedRequests = await getMatchedRequestsOfProperty(property);
      return {
        ...property,
        matchedRequests,
      };
    }),
  );
}

export const createProperty = action(propertyInputSchema, async (data) => {
  const user = await getCurrentUser();
  // Add the company to the database
  try {
    const property: Property = await prisma.property.create({
      data: {
        ...data,
        owner_id: user.id,
      },
      include: {
        images: true,
      },
    });
    return { success: true, property: property };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
});

export const updateProperty = action(propertyInputSchema, async (data) => {
  // Add the company to the database
  try {
    const property: Property = await prisma.property.update({
      where: {
        id: data.id,
      },
      data,
      include: {
        images: true,
      },
    });
    return { success: true, property: property };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
});

export const uploadPropertyImage = async (
  propertyId: string,
  imageUrl: string,
) => {
  const propertyImage = await prisma.property_images.create({
    data: {
      property_id: propertyId,
      path: imageUrl,
    },
  });

  const property: Property = await prisma.property.findFirst({
    where: { id: propertyId },
    include: { images: true },
  });

  return { success: true, property };
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const previousPropertie = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });

    if (previousPropertie.status === "booking") {
      return { success: false, message: "Property is already booked" };
    } else {
      const property: Property = await prisma.property.delete({
        where: {
          id: propertyId,
        },
      });
      return { success: true, property: property };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const deletePropertyImage = async ({
  propertyId,
  imageId,
}: {
  propertyId: string;
  imageId: string;
}) => {
  try {
    const propertyImage = await prisma.property_images.delete({
      where: {
        id: imageId,
      },
    });
    const property: Property = await prisma.property.findFirst({
      where: { id: propertyId },
      include: { images: true },
    });
    return { success: true, property };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
