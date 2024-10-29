"use client";

import { Fragment, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { builder } from "@/builders";
import { navigate } from "@/packages/actions";
import { cast, makePath, PAGES, pass } from "@/packages/libraries";
import { AddIcon } from "@/svgs";
import { AppShellHeader } from "@/components/admin/shared";
import { FlowContainer, FlowContentContainer } from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import { useEstateValue } from "@/packages/hooks/use-estate-query";
import { Form, useForm, yupResolver } from "@mantine/form";
import { schema } from "@/components/super-admin/estates/schema";
import { DesktopView } from "@/components/super-admin/estates/views/desktop";
import { MobileView } from "@/components/super-admin/estates/views/mobile";
import { handleError, handleSuccess } from "@/packages/notification";
import {
  FormProvider,
  FormValues,
  TransformFormValues,
} from "@/components/super-admin/estates/form-context";
import clsx from "clsx";

interface PageProps {
  params: {
    estate: string;
  };
}

export default function Page({ params }: PageProps) {
  const queryClient = useQueryClient();
  const {
    estate: { id: estateId, action: actionType },
  } = useEstateValue(params.estate);

  const { data, isLoading } = useQuery({
    queryKey: builder.estates.id.get.get(),
    queryFn: () => builder.use().estates.id.get(estateId as string),
    select: ({ data }) => data,
  });

  const { mutate: addNewEstate, isPending } = useMutation({
    mutationFn: builder.use().estates.post,
    onSuccess: () => {
      navigate(makePath(PAGES.DASHBOARD, PAGES.ESTATES));
      handleSuccess({
        message: "New Estate Added Successfully",
      });

      queryClient.invalidateQueries({
        queryKey: builder.estates.get.get(),
      });
    },
    onError: handleError(),
  });

  const { mutate: editEstate, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().estates.id.put,
    onSuccess: () => {
      navigate(makePath(PAGES.DASHBOARD, PAGES.ESTATES));
      handleSuccess({
        message: "Estate Updated Successfully",
      });

      queryClient.invalidateQueries({
        queryKey: builder.estates.get.get(),
      });
    },
    onError: handleError(),
  });

  const form = useForm<FormValues, TransformFormValues>({
    initialValues: {
      name: "",
      location: "",
      numberOfHouses: "",
      owner: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      serviceRequestTypes: [],
      houseTypes: [],
      interests: [],
      loading: true,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  useEffect(() => {
    const {
      name,
      location,
      numberOfHouses,
      owner,
      phone,
      manager,
      interests = [],
      serviceRequestTypes = [],
      houseTypes = [],
    } = {
      ...data,
    };
    form.setValues({
      name: pass.string(name),
      location: pass.string(location),
      numberOfHouses: pass.string(numberOfHouses),
      owner: pass.string(owner),
      interests: interests?.map((interest) => pass.string(interest)),
      phone: pass.string(phone),
      serviceRequestTypes: serviceRequestTypes?.map((type) =>
        pass.string(type)
      ),
      houseTypes: houseTypes?.map((type) => pass.string(type.id)),
      username: pass.string(manager?.username),
      email: pass.string(manager?.email),
      password: "",
      loading: false,
    });
  }, [data, isLoading]);

  const btnText =
    actionType === "view"
      ? "Edit Estate"
      : actionType === "add"
      ? "Add Estate"
      : "Save Changes";

  function handleSubmit({
    owner,
    username,
    email,
    phone,
    password,
    numberOfHouses,
    ...values
  }: typeof form.values) {
    const data = {
      ...values,
      numberOfHouses: cast.number(numberOfHouses),
      managerDetails: {
        owner,
        username,
        email,
        phone,
        password,
      },
    };

    if (actionType === "add") addNewEstate(data);
    else editEstate({ id: estateId as string, data });
  }

  return (
    <Fragment>
      <AppShellHeader
        title='Estate Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        {data ? (
          <FormProvider form={form}>
            <FlowContentContainer
              classNames={{
                root: clsx("rounded-xl bg-white lg:p-12 m-4 p-6 ", {}),
              }}
            >
              <Form form={form} className='h-full flex' onSubmit={handleSubmit}>
                <DesktopView
                  onSubmit={handleSubmit}
                  isSubmitting={isPending || isUpdating}
                  btnText={btnText}
                />
                <MobileView
                  onSubmit={handleSubmit}
                  isSubmitting={isPending || isUpdating}
                  btnText={btnText}
                />
              </Form>
            </FlowContentContainer>
          </FormProvider>
        ) : (
          <EmptySlot
            title='No Estate Found. Start by adding an estate to manage!'
            src='house'
            withButton
            text='Add Estate'
            btnProps={{
              leftSection: <AddIcon />,
              href: makePath(
                PAGES.DASHBOARD,
                PAGES.ESTATES,
                PAGES.ADD_NEW_ESTATE
              ),
            }}
          />
        )}
      </FlowContainer>
    </Fragment>
  );
}
