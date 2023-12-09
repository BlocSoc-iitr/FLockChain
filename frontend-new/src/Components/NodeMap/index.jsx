import React, { useState, Component, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Home = () => {
  const fgRef = useRef();
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(50),
        height: am5.percent(100),
        layout: root.verticalLayout
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
        nodePadding: 10
      })
    );

    series.outerCircles.template.states.create("hoverdisabled", {
      fillOpacity: 0.5,
      strokeOpacity: 0,
      strokeDasharray: 0
    });

    series.nodes.template.setAll({
    //   draggable: false,
      brightness: 0.8,
      // filter: "drop-shadow(0px 0px 20px #8a46ff)"
    });

    series.data.setAll([{
      name: "Root",
      value: 0,
      children: [{
        name: "User1",
        children: [{
          name: "Node1",
          value: 23
        }, {
          name: "Node1",
          value: 27
        }, {
          name: "Node1",
          value: 29
        }
        ]
      }]
    }]);
    series.set("selectedDataItem", series.dataItems[0]);
    root.current = root;

    return () => {
      root.dispose();
    };
  }, [])

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle((b) => !b);
  };

  const forceUpdate = useForceUpdate();

  return (
    <div className={styles.container}>
      <div id="chartdiv" className={styles.chartdiv}>
      <div className={styles.analysisDiv}>
        <p>Node 1: {}</p>
        <p>Node 2: {}</p>
        <p>Node 3: {}</p>
      </div>
      </div>
    </div>
  );
};

export default Home;
