import { useState } from "react";
import { Collapse, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const AdvancedParams = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Stack direction="row" alignItems="center" gap={1} sx={{ cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <Typography variant="caption">
          Advanced Params
        </Typography>
        <Image
          src="./arrowDown.svg"
          alt="arrowDown"
          width={16}
          height={16}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      </Collapse>
    </>
  );
};
