import { useMutation } from "@tanstack/react-query";
import { Input } from "./useCreate";
import useAuth from "../store/auth";
import closePopup from "../store/closePopup";

export function useUpdateJob(token: string, jobId: string) {
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
            formData.append("servicesPerHourPrice", String(input.servicesPerHourPrice));
            if (input.img) {
              formData.append("img", input.img);
            }
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/job/edit/${jobId}`, {
          method: "PUT",
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