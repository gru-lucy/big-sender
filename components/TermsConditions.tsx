import { Typography } from "@mui/material";
import Link from "next/link";

export const TermsConditions = () => {
  return (
    <Link href={"/"}>
      <Typography sx={{ textDecoration: "underline" }} variant="body2">
        Terms And Conditions
      </Typography>
    </Link>
  );
};
