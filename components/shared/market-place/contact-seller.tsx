import { ProductData } from "@/builders/types/products";
import { SMSIcon, WhatsAppIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";
import { Button, ButtonProps, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface ContactSellerButtonProps extends ButtonProps {
  data: ProductData;
}

export function ContactSellerButton({
  data,
  ...props
}: ContactSellerButtonProps) {
  const shareText = `Hi! I saw your listing on Estate Visa and I'm interested in it. Can we discuss further?`;
  return (
    <Button
      fz={12}
      size='compact-sm'
      h={40}
      my={20}
      onClick={(e) => {
        e.stopPropagation();
        modals.open({
          modalId: MODALS.CONTACT_US,
          children: (
            <Stack align='center' justify='center' ta='center' gap={20} py={20}>
              <Text fz={18}>
                Contact the seller to discuss further about the product
              </Text>
              <Flex gap={14}>
                <a
                  href={`sms:${data.phone}?&body=${shareText}`}
                  onClick={() => modals.closeAll()}
                >
                  <SMSIcon />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${
                    data.phone
                  }&text=${encodeURIComponent(shareText)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => modals.closeAll()}
                >
                  <WhatsAppIcon />
                </a>
              </Flex>
            </Stack>
          ),
        });
      }}
      {...props}
    >
      Contact Seller
    </Button>
  );
}
