import Head from "next/head";

export const Entete : React.FC = () =>{
    return(
        <Head>
          <title>EIra</title>
          <meta
          name="description"
          content="EIra l'Irathérapie digitale"
          />
          <link rel="icon" href="/image.png"/>
        </Head>
    )
}

export default Entete;