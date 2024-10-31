"use client";
import React from "react";
// Corrected the spelling of OrganizationList
import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const onboarding = () => {
  const { organization } = useOrganization();
  const router = useRouter();
  useEffect(() => {
    if (organization) {
      router.push("/organization/${organization.slug}");
    }
  }, [organization]);
  return (
    <div className="flex justify-center items-center pt-14 ">
      <OrganizationList hidePersonal />
    </div>
  );
};

export default onboarding;
