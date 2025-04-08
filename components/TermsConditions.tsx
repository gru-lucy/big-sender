import { Typography, SxProps, Theme } from "@mui/material";
import Link from "next/link";

export const TermsConditions = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <Link href={"/"}>
      <Typography sx={{ textDecoration: "underline", ...sx }} variant="body2">
        Terms And Conditions
      </Typography>
    </Link>
  );
};
