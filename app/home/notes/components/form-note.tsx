import { Button, Input, VStack } from "@chakra-ui/react";
import React from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
} from "@/src/components/ui/dialog";
import Form from "@/src/components/logic/form";
import { noteSchema } from "../schemas/note-form.schema";
import { NoteForm } from "../types/note-form";
import { Field } from "@/src/components/ui/field";
import { useAPI } from "@/src/hooks/api";
import { useLoading } from "@/src/contexts/loading";
import { FormNoteProps } from "../types/form-note-props";

export default function FormNote({ onClose, note }: FormNoteProps) {
  const { apiPost, apiPut } = useAPI();
  const { startLoading, stopLoading } = useLoading();

  const handleSave = (payload: NoteForm): void => {
    startLoading();

    const request = note 
      ? apiPut<NoteForm, unknown>({ endPoint: `/note/${note._id}`, payload })
      : apiPost<NoteForm, unknown>({ endPoint: "/note", payload });

    request.then(stopLoading).finally(onClose);
  };

  return (
    <DialogContent>
      <DialogHeader>{note ? "Edit Note" : "Create New Note"}</DialogHeader>
      <DialogBody>
        <Form<NoteForm>
          schema={noteSchema}
          onSubmit={handleSave}
          defaultValues={note ?? undefined}
        >
          {({ register, errors }) => (
            <VStack p={4} align="stretch">
              <Field label="Title" errorText={errors.title?.message} invalid={!!errors.title}>
                <Input
                  placeholder="Title"
                  variant="outline"
                  {...register("title")}
                  required
                />
              </Field>

              <Field label="Description" errorText={errors.description?.message} invalid={!!errors.description}>
                <Input
                  placeholder="Description"
                  variant="outline"
                  {...register("description")}
                  required
                />
              </Field>

              <Button type="submit" colorScheme="blue" size="lg" mt={4}>
                {note ? "Salvar Alterações" : "Criar"}
              </Button>
            </VStack>
          )}
        </Form>
      </DialogBody>
      <DialogCloseTrigger />
    </DialogContent>
  );
}
