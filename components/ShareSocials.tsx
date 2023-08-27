import { Facebook, Inspect, Instagram, Twitter } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const ShareSocial = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this paper</CardTitle>
        <CardDescription>
          you can share this research paper with your friends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-evenly">
          <Facebook className="social-button" />
          <Instagram className="social-button" />
          <Twitter className="social-button" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareSocial;
