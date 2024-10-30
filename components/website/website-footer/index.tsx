import Link from "next/link";
import clsx from "clsx";
import { Divider, Flex, Stack, Text } from "@mantine/core";
import { Copyright } from "iconsax-react";
import { FOOTER_LINKS } from "./links";
import { FOOTER_CONTACT } from "./contact";
import {
  EstateVisaLogo,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/svgs";

export function WebsiteFooter() {
  return (
    <>
      <Stack
        component='footer'
        mt='auto'
        fz={14}
        className='lg:p-16 md:p-8 py-12 px-5 lg:pb-10 justify-evenly'
      >
        <div
          className={clsx(
            "flex flex-wrap gap-12 sm:gap-8",
            "clump:gap-x-[clamp(20px,9vw,172px)] xl:clump:gap-x-[clamp(20px,6vw,172px)] ",
            "flex-col justify-start md:flex-row xl:justify-between"
          )}
          style={{
            rowGap: 30,
            columnGap: 50,
          }}
        >
          <div className='flex flex-row flex-1 items-center lg:flex-col gap-2 lg:items-start'>
            <EstateVisaLogo width={80} />
            <Text fw={700} fz={18}>
              Estate Visa
            </Text>
          </div>

          <div
            className={clsx(
              "flex md:flex-row basis-full lg:basis-0 flex-[2] justify-between gap-10 flex-wrap"
            )}
          >
            {FOOTER_LINKS.map(({ title, links }) => {
              return (
                <div
                  className='w-fit flex flex-col sm:flex-1 gap-4 '
                  key={title}
                >
                  <h3 className='prose-lg/semi-bold'>{title}</h3>
                  <div className='flex flex-col gap-3'>
                    {links.map(({ name, link }) => {
                      return (
                        <Link
                          href={link}
                          key={name}
                          className='w-fit text-base hover:underline'
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className='flex flex-1 flex-col gap-3'>
            <h3 className='prose-lg/semi-bold'>Contact Information</h3>
            {FOOTER_CONTACT.map((item) => {
              return (
                <div
                  className='flex items-center gap-3 flex-wrap'
                  key={item.value}
                >
                  <p className='text-base'>{item.label}:</p>
                  <Link target='_blank' rel='noopener' href={item.link}>
                    <p className='text-base text-accent-5 hover:underline'>
                      {item.value}
                    </p>
                  </Link>
                </div>
              );
            })}
            <div className='flex items-center gap-5  mt-1 flex-wrap'>
              <Link
                rel='noopener'
                target='_blank'
                href='https://www.instagram.com/'
              >
                <InstagramIcon />
              </Link>

              <Link
                rel='noopener'
                target='_blank'
                href='https://www.facebook.com/'
              >
                <FacebookIcon />
              </Link>

              <Link rel='noopener' target='_blank' href='https://www.x.com/'>
                <XIcon />
              </Link>

              <Link
                rel='noopener'
                target='_blank'
                href='https://www.linkedin.com/'
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>

        <Divider bg='gray.4' my={35} />

        <div className='flex flex-col items-center sm:flex-row w-full justify-between gap-6'>
          <div className='flex items-center gap-1'>
            <Copyright size='18' color='gray' />
            <p className='text-[14px]'>
              {new Date().getFullYear()} Estate Visa. All rights reserved.
            </p>
          </div>
          <Flex gap={20}>
            <Link href='#' className='text-sm font-semibold hover:underline'>
              Privacy Policy
            </Link>
            <Link href='#' className='text-sm font-semibold hover:underline'>
              Terms of Use
            </Link>
            <Link href='#' className='text-sm font-semibold hover:underline'>
              Feedback
            </Link>
          </Flex>
        </div>
      </Stack>
    </>
  );
}
