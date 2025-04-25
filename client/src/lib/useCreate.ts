import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";

export type Input = {
  title: string;
  description: string;
  category: string;
  standardPrice: number;
  standardRevision: number;
  standardDesc: string;
  mediumPrice: number;
  mediumRevision: number;
  mediumDesc: string;
  premiumPrice: number;
  premiumRevision: number;
  premiumDesc: string;
  img?: File;
};

export function useCreateJob(token: string) {
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  return useMutation({
    mutationFn: async (input: Input) => {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("standardPrice", String(input.standardPrice));
      formData.append("standardRevision", String(input.standardRevision));
      formData.append("standardDesc", input.standardDesc);
      formData.append("mediumPrice", String(input.mediumPrice));
      formData.append("mediumRevision", String(input.mediumRevision));
      formData.append("mediumDesc", input.mediumDesc);
      formData.append("premiumPrice", String(input.premiumPrice));
      formData.append("premiumRevision", String(input.premiumRevision));
      formData.append("premiumDesc", input.premiumDesc);
      if (input.img) {
        formData.append("img", input.img);
      }

      const res = await fetch("http://localhost:3000/job/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        logout();
        togglePopup(true);
        throw new Error("Session expired");
      }
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });
}
