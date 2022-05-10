import { makeStyles } from "@mui/styles";
import {
  Container, Grid, Card, CardMedia,
  CardContent, Typography, Box
} from "@mui/material";
import Link from "next/link";
import Header from "../../components/header";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  example: {
    color: "red"
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0"
  },
  cardMedia: {
    paddingTop: "140%"
  }
}));

function Category({ posts, categories }) {

  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header data={categories} />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {console.log(posts)}
            {posts.map((post) => (
              <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
                <Grid item xs={6} sm={4} md={3}>
                  <Card>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.product_image[0].image}
                      title="Image title"
                      alt={post.product_image[0].alt_text}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        ${post.regular_price}
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
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "shoes" } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {

  const res = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
  const posts = await res.json();

  const ress = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await ress.json();

  return {
    props: {
      posts,
      categories
    }
  };
}

export default Category;