import { makeStyles } from "@mui/styles";
import { useRouter } from "next/dist/client/router";
import { Container, Paper, Grid, Box, Hidden } from "@mui/material";
import Head from "next/head";
import Header from "../../components/header";
import { gql } from "@apollo/client";
import client from "../api/apollo-client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    borderRadius: "0",
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    borderRadius: "0",
    marginLeft: 25,
    ["@media (max-width:600px)"]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    borderRadius: "0",
    paddingLeft: 40,
    paddingTop: 30,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: "100%",
  },
}));

function Product({ post, categories }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {console.log(post)}
      <Head>
        <title>{post.title.toTitle()}</title>
      </Head>
      <Header data={categories} />
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Hidden only={["xs", "sm"]}>
            <Grid item sm={1}>
              <Paper className={classes.paperImagePreview} elevation={0}>
                {post.productImage.map((c) => (
                  <div key={c.id}>
                    <Paper className={classes.paperImage} elevation={0}>
                      <img
                        src={c.image}
                        alt={c.altText}
                        className={classes.img}
                      />
                    </Paper>
                  </div>
                ))}
              </Paper>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperImage} elevation={0}>
              <img
                src={post.productImage[0].image}
                alt={post.productImage[0].altText}
                className={classes.img}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paperImage} elevation={0}>
              <Box component="h1" fontSize={18} fontWeight="400">
                {post.title}
              </Box>
              <Box component="p" fontSize={22} fontWeight="900">
                ${post.regular_price}
              </Box>
              <Box component="p" m={0} fontSize={14}>
                Free Delivery & Returns (Ts&Cs apply)
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {console.log(post)}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "boots-4" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
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

  const product_data = gql`
    query ($slug: String!) {
      allProductsByName(slug: $slug) {
        title
        description
        regularPrice
        productImage {
          id
          image
          altText
        }
      }
    }
  `;

  const slug = params.slug;
  const { data } = await client.query({
    query: product_data,
    variables: { slug },
  });

  return {
    props: {
      post: data.allProductsByName,
      categories: categories.data.allCategories,
    },
  };
}

export default Product;
