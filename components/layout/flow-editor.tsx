"use client";

import { Flex, Input, Stack, TextInputProps } from "@mantine/core";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";

import { FlowContentContainer } from "./flow-content-container";
import { FlowPaper } from "./flow-paper";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import SubScript from "@tiptap/extension-subscript";
import SuperScript from "@tiptap/extension-superscript";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import clsx from "clsx";

interface FlowEditorProps
  extends GetInputPropsReturnType,
    Omit<TextInputProps, keyof GetInputPropsReturnType> {}

export function FlowEditor(props: FlowEditorProps) {
  const { value, onChange, onFocus, onBlur, error, ...textInputProps } = props;
  const { label, withAsterisk, placeholder } = textInputProps;

  const editor = useEditor({
    extensions: [
      // mark extensions
      Bold,
      Code,
      Highlight,
      Link,
      Italic,
      Strike,
      SubScript,
      SuperScript,
      Underline,

      // node extensions
      Document,
      Text,
      Paragraph,
      TextAlign,
      BulletList,
      OrderedList,
      ListItem,

      // functionality extensions
      Placeholder.configure({ placeholder }),
      History.configure({
        depth: 10,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    onFocus,
    onBlur,
  });

  return (
    <Input.Wrapper
      withAsterisk={withAsterisk}
      label={label}
      component={Stack}
      classNames={{
        label: "prose-lg/medium text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <RichTextEditor
        editor={editor}
        classNames={{
          typographyStylesProvider: "flex-1",
          control: "border-none rounded-none",
          content: clsx(
            "[&_ul]:list-disc [&_ul]:list-outside",
            "[&_ol]:list-decimal [&_ol]:list-outside"
          ),
          linkEditorInput: "border-e border-solid",
        }}
      >
        <FlowContentContainer h={100}>
          <FlowPaper>
            <RichTextEditor.Content />
          </FlowPaper>
        </FlowContentContainer>

        <Flex align="center" gap={8} px="md" py="sm">
          <RichTextEditor.Code />
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Link />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </Flex>
      </RichTextEditor>
      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );
}
