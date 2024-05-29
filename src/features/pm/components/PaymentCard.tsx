"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PaymentDialog from "./PaymentDialog";
import { useState } from "react";

interface IPaymentCardProps {
  periodTime: string;
  price: string;
}

export default function PaymentCard({ periodTime, price }: IPaymentCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full py-5 lg:w-[350px]">
      <PaymentDialog open={open} onOpenChange={setOpen} product={periodTime} />
      <CardHeader>
        <CardTitle className="text-center">{periodTime}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2 ">{price}</div>
        <div className="flex items-center justify-center border-b border-gray-200 py-5">
          <Button
            className="rounded-full bg-primary px-8 py-4 text-lg"
            onClick={() => setOpen(true)}
          >
            Subscribe Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
