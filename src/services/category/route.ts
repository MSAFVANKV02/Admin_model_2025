import { CREATE_CATEGORY_URL, GET_CATEGORY_URL, TOGGLE_CATEGORY_URL } from "@/types/urlPath";
import { API } from "../auth/route";

export const create_Category_Api = async (data: {
  name: string | null;
  parentId: string | null;
  coverImage: string | null;
  iconImage: string | null;
}) => await API.post(CREATE_CATEGORY_URL, data, { withCredentials: true });

export const get_Category_Api = async () =>
  await API.get(GET_CATEGORY_URL, { withCredentials: true });


export const toggle_Category_Api = async (field:"featured"|"published",id:string) =>
    await API.patch(`${TOGGLE_CATEGORY_URL}/${id}`,{ field }, { withCredentials: true });
