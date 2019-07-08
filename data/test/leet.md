# 何时我能获得LeetCodeT恤？

好奇我什么时候可以获得LeetCodeT恤，就写了一个小程序预测一下（用的Java1.8）。

![1549867782088](assets/1549867782088.png)

算我每天都登录的话，有七天连续登录奖励（一周17个积分）。每周周赛最差105（前100名的积分+参与积分），运气好能305。

**设计思路：**

逻辑问题：

选了“Login everyday？”—>每周增速加17；

选了“Join every week contest？”—>才能选“How many coins every contest?”—>每周增速加填写值；

最后计算获奖时间（因为每周日才有比赛，$需要天数=7*（目标积分-现有积分）/每周增速$的算法有些出入，但是应该相差不大）。

需要进行一些异常处理：

1. 现在积分已经都换礼品的，显示“You can get the LeetCode Shirt now!”或者“You can get the LeetCode Bucket now!”
2. 选了每周都参加周赛的，但是没有选每周能得多少积分，提醒“How many coins you can get in every week contest?”
3. 没有输入当前积分的，提醒“How many coins you can get in every week contest?”
4. 输入非法字符的，提醒“Your coins has illegal character!”
5. 增速为0的，提醒“you can't get any gift without any work!”

~~~java
import java.awt.*;
import java.awt.event.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class SwingControlDemo {
    static final int ShirtCoin = 6000;
    static final int BucketCoin = 6800;
    private JFrame mainFrame;
    private JPanel actionPanel;
    private JCheckBox everyDayBox;
    private JCheckBox everyWeekBox;
    private JComboBox<String> awardBox;
    private JLabel statusLabel;

    public SwingControlDemo() {
        mainFrame = new JFrame("预测何时可兑换LeetCode奖品");
        mainFrame.setSize(new Dimension(500, 400));
        mainFrame.setLayout(new GridLayout(4, 1));
        mainFrame.setLocationRelativeTo(null);
        mainFrame.setResizable(false);
        mainFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        prepareActionPanel();
        JTextField textField = new JTextField();
        textField.setFont(new Font("黑体", Font.BOLD, 22));
        textField.setHorizontalAlignment(JTextField.CENTER);
        mainFrame.add(textField);
        statusLabel = new JLabel();
        statusLabel.setFont(new Font("黑体", Font.BOLD, 16));
        statusLabel.setHorizontalAlignment(JLabel.CENTER);
        mainFrame.add(statusLabel);
        JButton button = new JButton("Compute");
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                char[] chars = textField.getText().toCharArray();
                if (chars.length <= 0) {
                    statusLabel.setText("Please write your coins!");
                    return;
                }
                for (char c : chars) {
                    if (!Character.isDigit(c)) {
                        statusLabel.setText("Your coins has illegal character!");
                        return;
                    }
                }
                int nowCoin = Integer.valueOf(textField.getText());

                int speedOfGetCoin = (everyDayBox.isSelected() ? 17 : 0);

                String s = (String) awardBox.getSelectedItem();
                if (s != null && Character.isDigit(s.charAt(0))) {
                    speedOfGetCoin += Integer.valueOf(s);
                } else if (everyWeekBox.isSelected()){
                    statusLabel.setText("How many coins you can get in every week contest?");
                    return;
                }

                if (speedOfGetCoin == 0) {
                    statusLabel.setText("You can't get any gift without any work!");
                    return;
                }
                int distanceToShirt = (ShirtCoin - nowCoin) % speedOfGetCoin == 0 ?
                        (ShirtCoin - nowCoin) / speedOfGetCoin : (ShirtCoin - nowCoin) / speedOfGetCoin + 1;
                int distanceToBucket = (BucketCoin - nowCoin) % speedOfGetCoin == 0 ?
                        (BucketCoin - nowCoin) / speedOfGetCoin : (BucketCoin - nowCoin) / speedOfGetCoin + 1;
                String stringToShirt;
                if (nowCoin >= ShirtCoin) {
                    stringToShirt = "You can get the LeetCode Shirt now!";
                } else {
                    Date date = new Date();
                    Calendar c1 = Calendar.getInstance();
                    c1.setTime(date);
                    c1.add(Calendar.DATE, distanceToShirt * 7);
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    stringToShirt = "You will get the LeetCode Shirt in " + sdf.format(c1.getTime());
                }
                String stringToBucket;
                if (nowCoin >= BucketCoin) {
                    stringToBucket = "You can get the LeetCode Bucket now!";
                } else {
                    Date date = new Date();
                    Calendar c1 = Calendar.getInstance();
                    c1.setTime(date);
                    c1.add(Calendar.DATE, distanceToBucket * 7);
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    stringToBucket = "You will get the LeetCode Bucket in " + sdf.format(c1.getTime());
                }
                statusLabel.setText("<html><body>" + stringToShirt + "<br>"
                        + stringToBucket + "<body></html>");
            }
        });
        mainFrame.add(button);
        mainFrame.setVisible(true);

    }

    private void addComboBox(JComboBox<String> box, String[] strings) {
        for (String s : strings) {
            box.addItem(s);
        }
    }

    private void prepareActionPanel() {
        actionPanel = new JPanel();
        actionPanel.setLayout(new GridLayout(3, 2));
        Label dayLabel = new Label("Login everyday?");
        dayLabel.setFont(new Font("宋体", Font.PLAIN, 16));
        everyDayBox = new JCheckBox();
        Label weekLabel = new Label("Join every week contest？");
        weekLabel.setFont(new Font("宋体", Font.PLAIN, 16));
        everyWeekBox = new JCheckBox();
        Label awardLabel = new Label("How many coins every contest?");
        awardLabel.setFont(new Font("宋体", Font.PLAIN, 16));
        awardBox = new JComboBox<>();
        awardBox.setFont(new Font("宋体", Font.PLAIN, 16));
        awardBox.removeAllItems();
        awardBox.addItem("Has selected above box?");

        everyWeekBox.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                if (everyWeekBox.isSelected()) {
                    awardBox.removeAllItems();
                    addComboBox(awardBox, new String[]{"Please select!", "5005", "2505", "1005", "305", "105", "55", "5"});
                } else {
                    awardBox.removeAllItems();
                    awardBox.addItem("Has selected above box?");
                }
            }
        });

        actionPanel.add(dayLabel);
        actionPanel.add(everyDayBox);
        actionPanel.add(weekLabel);
        actionPanel.add(everyWeekBox);
        actionPanel.add(awardLabel);
        actionPanel.add(awardBox);
        mainFrame.add(actionPanel);
    }

    public static void main(String[] args) {
        SwingControlDemo swingControlDemo = new SwingControlDemo();
    }
}

~~~

