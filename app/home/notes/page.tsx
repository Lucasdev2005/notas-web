// Notes.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAPI } from "@/src/hooks/api";
import { Note } from "./types/note";
import { Table, Stack, Button, Flex, Icon } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import FormNote from "./components/form-note";
import { TbTrash } from "react-icons/tb";
import { BiPencil, BiPlus, BiUser } from "react-icons/bi";
import { useLoading } from "@/src/contexts/loading";
import { TOKEN_KEY } from "@/src/constants/token";
import Cookies from "js-cookie";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { apiGet, apiDelete } = useAPI();
  const { startLoading, stopLoading} = useLoading();

  useEffect(() => {
    apiGet<Note[]>({
      endPoint: "/note",
    }).then((response) => {
      setNotes(response.data);
    });
  }, []);

  const deleteNote = (id: string): void => {
    startLoading();

    apiDelete<void>({
      endPoint: `/note/${id}`
    }).then(stopLoading);
  }

  const logout = (): void => {
    Cookies.remove(TOKEN_KEY);
  }

  return (
    <>
      <DialogRoot>
        <FormNote 
          onClose={() => setSelectedNote(null)} 
          note={selectedNote}
        />
        <Flex gap="2">
          <DialogTrigger asChild>
            <Button bg="white" color="black" size="sm" onClick={() => setSelectedNote(null)}>
              Nova Nota
              <Icon fontSize="2xl">
                <BiPlus />
              </Icon>
            </Button>
          </DialogTrigger>
          <Button bg="white" color="black" size="sm" onClick={logout}>
            logout
            <Icon fontSize="2xl">
              <BiUser />
            </Icon>
          </Button>
        </Flex>

        <Stack gap="10">
          <Table.Root key="line" size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {notes.map((note) => (
                <Table.Row key={note._id}>
                  <Table.Cell>{note.title}</Table.Cell>
                  <Table.Cell>{note.description}</Table.Cell>
                  <Table.Cell justifyContent="flex-end">
                    <Flex justifyContent="flex-end" gap="2">
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedNote(note)}
                        >
                          <BiPencil />
                        </Button>
                      </DialogTrigger>
                      <Button
                        size="sm"
                        bg="red"
                        color="white"
                        onClick={() => deleteNote(note._id)}
                      >
                        <Icon fontSize="2xl">
                          <TbTrash />
                        </Icon>
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      </DialogRoot>
    </>
  );
}
