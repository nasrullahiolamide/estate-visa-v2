"use client";

import clsx from "clsx";

import { builder } from "@/builders";
import { useFakeSingleEstateData } from "@/builders/types/estates";
import { AppShellHeader } from "@/components/admin/shared";
import { FlowContainer, FlowContentContainer } from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import {
  FormProvider,
  FormValues,
  TransformFormValues,
} from "@/components/super-admin/estates/form-context";
import { schema } from "@/components/super-admin/estates/schema";
import { DesktopView } from "@/components/super-admin/estates/views/desktop";
import { MobileView } from "@/components/super-admin/estates/views/mobile";
import { AddIcon } from "@/icons";
import { navigate } from "@/packages/actions";
import { useEstateValue } from "@/packages/hooks/use-estate-query";
import { cast, makePath, PAGES, pass } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toString } from "lodash";
import { Fragment, useEffect, useMemo } from "react";

interface PageProps {
  params: {
    estate: string;
  };
}

export default function Page({ params }: PageProps) {
  const queryClient = useQueryClient();
  const initialEstateData = useMemo(() => useFakeSingleEstateData(), []);
  const {
    estate: { id: estateId, action: actionType },
  } = useEstateValue(params.estate);

  const { data: estates, isPlaceholderData } = useQuery({
    queryKey: builder.estates.id.get.$get(estateId),
    queryFn: () => builder.$use.estates.id.get(toString(estateId)),
    placeholderData: initialEstateData,
    enabled: !!estateId,
  });

  const { mutate: editEstate, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.estates.id.put,
    onSuccess: () => {
      navigate(makePath(PAGES.DASHBOARD, PAGES.ESTATES));
      queryClient.invalidateQueries({
        queryKey: builder.estates.get.$get(),
      });
      handleSuccess({
        message: "Estate Updated Successfully",
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
      email: "",
      phone: "",
      serviceRequestTypes: [],
      houseTypes: [],
      interests: [],
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
      ...estates,
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
      email: pass.string(manager?.email),
      action: actionType,
    });
  }, [estates, isPlaceholderData]);

  const isViewing = form.getValues().action === "view";
  const isEditing = form.getValues().action === "edit";
  const btnText = isViewing ? "Edit Estate" : "Save Changes";

  function handleSubmit() {
    const { owner, email, phone, numberOfHouses, action, ...values } =
      form.getValues();

    const data = {
      ...values,
      numberOfHouses: cast.number(numberOfHouses),
      managerDetails: {
        owner,
        email,
        phone,
      },
    };

    isEditing && editEstate({ id: estateId ?? "", data });
    isViewing && form.setValues({ action: "edit" });
  }

  return (
    <Fragment>
      <AppShellHeader
        title='Estate Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        {estates ? (
          <FormProvider form={form}>
            <FlowContentContainer
              classNames={{
                root: clsx("rounded-xl bg-white lg:p-12 m-4 p-6 ", {
                  skeleton: isPlaceholderData,
                }),
              }}
            >
              <Form form={form} className='h-full flex'>
                <DesktopView
                  onSubmit={handleSubmit}
                  isSubmitting={isUpdating}
                  btnText={btnText}
                />
                <MobileView
                  onSubmit={handleSubmit}
                  isSubmitting={isUpdating}
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
              component: "a",
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
