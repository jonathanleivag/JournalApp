import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dmjxpnr5g",
  api_key: "639886114365764",
  api_secret: "YfKUWbJHEdfn10RihY-lk27lO6k",
});

describe("Pruebas en fileUpload", () => {
  test("debe de cargar un archivo y retornar el URL", async (done) => {
    const resp = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
    const segments = url.split("/");
    const imageName = segments[segments.length - 1];
    const imageId = imageName.split(".")[0];
    cloudinary.v2.api.delete_resources(imageId, {}, () => done());
  });

  test("debe de retornar un error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
