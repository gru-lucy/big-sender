"use client";

import { Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Success = () => {
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: "768px" }}>
      <Stack
        alignItems="center"
        position="relative"
        justifyContent="center"
        sx={{
          padding: "40px 24px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack position="relative" height={55} width={"100%"} top={-150}>
          <Image
            src={"/success.png"}
            alt="Success Icon"
            width={336}
            height={336}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              zIndex: 0,
            }}
          />
        </Stack>
        <Stack
          gap={3}
          zIndex={1}
          alignItems="center"
          position="relative"
          justifyContent="center"
        >
          <Typography variant="h1" fontWeight={600} textAlign="center">
            Congratulation!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              "@media (min-width: 600px)": {
                margin: "0 70px",
              },
            }}
          >
            Email sent! The recipient has 7 days to download your files.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/transfer")}
          >
            New Transfer?
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
