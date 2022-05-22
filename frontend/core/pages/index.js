import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import Header from "../components/header";
import { gql } from "@apollo/client";
import client from "./api/apollo-client";

const useStyles = makeStyles((theme) => ({
  example: {
    color: "red",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Home({ categories, data }) {
  const classes = useStyles();

  return (
    <>
      {console.log(data)}
      <Header data={categories} />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {data.map((post) => (
              <Link
                key={post.id}
                href={`product/${encodeURIComponent(post.slug)}`}
              >
                <Grid item xs={6} sm={4} md={3}>
                  <Card>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.productImage[0].image}
                      title="Image title"
                      alt={post.productImage[0].altText}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        ${post.regularPrice}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const categories = await client.query({
    query: gql`
      query Categories {
        allCategories {
          id
          name
          slug
        }
      }
    `,
  });

  const { data } = await client.query({
    query: gql`
      query all_Products {
        allProducts {
          title
          description
          regularPrice
          slug
          productImage {
            id
            image
            altText
          }
        }
      }
    `,
  });

  return {
    props: {
      data: data.allProducts,
      categories: categories.data.allCategories,
    },
  };
}

export default Home;
