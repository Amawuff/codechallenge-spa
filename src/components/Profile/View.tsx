import { Card, CardContent, Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
import { TUserData } from "../../utils/types";
import { formatPhoneNumber } from "../../utils/profileHelpers";

const View: React.FC<{ profile: TUserData | null }> = ({ profile }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          {Object.entries(profile as object).map(([key, value]) => {
            if (key !== "password") {
              if(key === "phone"){ value = formatPhoneNumber(value)}
              return (
                <React.Fragment key={key}>
                  <Grid key={key} size={2}>
                    <Typography variant="h6">{key}:</Typography>
                  </Grid>
                  <Grid key={value} size={4}>
                    <Typography sx={{ lineHeight: "2" }}>{value}</Typography>
                  </Grid>
                </React.Fragment>
              );
            }
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default View;
