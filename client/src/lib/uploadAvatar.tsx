import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadAvatar(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({avatarFile, name}: {avatarFile: File, name: string}) => {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      formData.append("name", name);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["fullUser"] });
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}