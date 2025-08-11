// import React from 'react'
import { useState } from "react";
import { Button } from "@mui/material";
import { ContentHeader } from "../../elements/ContentHeader";
import { Edit } from "@mui/icons-material";
import { GenericModal, TypeGenericModalProps } from "../../elements/GenericModal";

export const AgencyList = () => {

  const [genericModalProps, setGenericModalProps] = useState<TypeGenericModalProps>();

  return (
    <>
      <ContentHeader title="Agency List">
        <Button
          variant="contained"
          size="large"
        >
          Create
        </Button>
      </ContentHeader>

      <div className="row">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="agency-card">
            <div className="card-header">
              <div
                className="card-title"
                onClick={() => setGenericModalProps({
                  title: "Agency Details",
                  openModal: true,
                  content: <>jksvgsvb  lkvsvfnl lskvnlsnv lvsekvnlsndvn vlsdkvnl</>,
                  onClose: () => setGenericModalProps(undefined),
                  size: "md"
                })}
              >
                Acme Private Ltd.
              </div>
              <div className="card-icon"> <Edit /> </div>
            </div>

            <div className="card-details">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ever since the 1500s.
            </div>
          </div>
        </div >
      </div >

      {
        genericModalProps &&
        <GenericModal {...genericModalProps} />
      }
    </>
  );
};

