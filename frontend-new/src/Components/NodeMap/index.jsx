import React, { useState, Component, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Navbar from "../Navbar";
import { useSDK } from "@metamask/sdk-react";
import axios from "axios";

const NodeMap = () => {
  const fgRef = useRef();
  const { account } = useSDK();
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(50),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );
    var series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        downDepth: 1,
        initialDepth: 2,
        topDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        minRadius: am5.percent(5),
        manyBodyStrength: -30,
        nodePadding: 10,
        maxRadius: am5.percent(10),
      })
    );

    series.outerCircles.template.states.create("hoverdisabled", {
      fillOpacity: 0.5,
      strokeOpacity: 0,
      strokeDasharray: 0,
    });

    series.nodes.template.setAll({
      //   draggable: false,
      brightness: 0.8,
    });

    series.data.setAll([
      {
        name: "Root",
        value: 0,
        children: [
          {
            name: `${account && account?.slice(0, 6)}...${
              account && account?.slice(-5, -1)
            }}`,
            value: 2,
            children: [
              {
                name: "Node",
                value: 1,
              }
            ],
          },
          {
            name: "Malicious Node",
            value: 2,
          },
        ],
      },
    ]);
    series.set("selectedDataItem", series.dataItems[0]);
    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle((b) => !b);
  };

  const forceUpdate = useForceUpdate();

  const handleDownload = async () => {
    window.open("http://192.168.206.90/api/v1/SendUpadatedParams", "_blank");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div id="chartdiv" className={styles.chartdiv}>
          <div className={styles.analysisDiv}>
            <div>
              Node 1:<p>+0.001</p>
            </div>
            <div className={styles.lossDiv}>
              Malicious Node:<p>None</p>
            </div>
          </div>
        </div>
        <button
          className={styles.modalDepositButton}
          onClick={() => handleDownload()}
        >
          Download Trained Model
        </button>
      </div>
    </>
  );
};

export default NodeMap;
