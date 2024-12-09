import { TUserData } from "../../utils/types";
import { Card, CardContent, Typography, Grid2 as Grid } from "@mui/material";

const View: React.FC<{ profile: TUserData | null }> = ({ profile }) => {

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          {Object.entries(profile as object).map(([key, value]) => {
            if (key !== "password") {
              return (
                <>
                  <Grid size={2}>
                    <Typography variant="h6">{key}:</Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography sx={{ lineHeight: "2" }}>{value}</Typography>
                  </Grid>
                </>
              );
            }
          })}

        </Grid>
      </CardContent>
    </Card>
  );
};

export default View;
